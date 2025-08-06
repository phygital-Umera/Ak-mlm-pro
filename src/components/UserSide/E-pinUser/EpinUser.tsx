import React, {useEffect} from 'react';
import {useForm, FormProvider, useFieldArray} from 'react-hook-form';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCreateEpinRequest} from '@/lib/react-query/Customer/epin';
import {useAuthContext} from '@/context/AuthContext';
import DisplayEpinUser from './DisplayEpinUser';
import toast from 'react-hot-toast';
import {useGetCustomerAllProducts} from '@/lib/react-query/Customer/product';

const createEpinRequestSchema = z.object({
  paidAmount: z.string().min(1, {message: 'Paid amount is required'}),
  epins: z
    .array(
      z.object({
        price: z.string().min(1, {message: 'Price is required'}),
        count: z.string().min(1, {message: 'Count is required'}),
      }),
    )
    .min(1, {message: 'At least one product is required'}),
  imageFile: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: 'Payment proof is required',
  }),
});

type FormValues = z.infer<typeof createEpinRequestSchema>;

const EpinUser: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(createEpinRequestSchema),
    defaultValues: {
      paidAmount: '',
      epins: [],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control: methods.control,
    name: 'epins',
  });

  const watchFiles = methods.watch('imageFile');
  const {user} = useAuthContext();
  const {data: products} = useGetCustomerAllProducts();

  const {
    mutate: createEpinRequest,
    isSuccess,
    isPending,
    error,
  } = useCreateEpinRequest();

  const handleProductSelect = (product: (typeof products)[0]) => {
    const existingIndex = fields.findIndex(
      (item) => Number(item.price) === product.discountedPrice,
    );

    if (existingIndex >= 0) {
      const currentCount = methods.getValues(`epins.${existingIndex}.count`);
      methods.setValue(
        `epins.${existingIndex}.count`,
        String(Number(currentCount) + 1),
      );
    } else {
      append({
        price: String(product.discountedPrice),
        count: '1',
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const selectedFile =
      watchFiles instanceof FileList ? Array.from(watchFiles) : [];

    // Prepare the epins array with proper structure
    const epinsData = data.epins.map((epin) => ({
      price: Number(epin.price),
      count: Number(epin.count),
    }));

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('paidAmount', data.paidAmount);
    formData.append('imageFile', selectedFile[0]);
    formData.append('epins', JSON.stringify(epinsData));

    createEpinRequest(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-Pin created successfully');
      methods.reset();
    }
    if (error) {
      toast.error('Error creating E-Pin');
    }
  }, [isSuccess, error, methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
        encType="multipart/form-data"
      >
        <h1 className="mb-4 text-lg font-semibold">Epin Request</h1>

        {/* Paid Amount */}
        <GenericInputField
          name="paidAmount"
          label="Paid Amount"
          placeholder="Enter paid amount"
          type="number"
        />
        {methods.formState.errors.paidAmount && (
          <p className="mt-1 text-sm text-red-600">
            {methods.formState.errors.paidAmount.message}
          </p>
        )}

        {/* Product Selection */}
        <div className="space-y-4">
          <h2 className="text-md font-medium">Available Products</h2>
          {methods.formState.errors.epins && (
            <p className="text-sm text-red-600">
              {methods.formState.errors.epins.message}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => {
              const isSelected = fields.some(
                (item) => Number(item.price) === product.discountedPrice,
              );
              const selectedCount = isSelected
                ? fields.find(
                    (item) => Number(item.price) === product.discountedPrice,
                  )?.count
                : 0;

              return (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold">
                            ₹{product.discountedPrice}
                          </span>
                          {product.actualPrice > product.discountedPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.actualPrice}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                            {selectedCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Products Summary */}
        {fields.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Selected Products</h3>
            <div className="divide-y divide-gray-200 rounded-lg border">
              {fields.map((field, index) => {
                const product = products?.find(
                  (p) => p.discountedPrice === Number(field.price),
                );
                return (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product?.images}
                        alt={product?.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product?.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{field.price} × {field.count}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="mt-6">
          <label htmlFor="imageFile" className="mb-2 block text-sm font-medium">
            Upload Payment Proof
          </label>
          <input
            type="file"
            {...methods.register('imageFile')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
          {methods.formState.errors.imageFile && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.imageFile.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end space-x-4">
          <GenericButton type="submit" disabled={isPending || fields.length === 0}>
            {isPending ? 'Processing...' : 'Request E-Pin'}
          </GenericButton>
        </div>
      </form>

      {/* Additional Display */}
      <div className="mt-8">
        <DisplayEpinUser />
      </div>
    </FormProvider>
  );
};

export default EpinUser;