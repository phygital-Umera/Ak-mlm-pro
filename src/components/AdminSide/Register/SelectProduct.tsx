import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useRegistration} from '@/context/RegisterContext';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {FiMinus, FiPlus, FiShoppingBag} from 'react-icons/fi';

interface SponserInfoProps {
  onNext: () => void;
}

export const SelectProduct: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm({defaultValues: {}});
  const {setSelectProduct} = useRegistration();
  const {data: products} = useGetAllProducts();

  const [selectedProducts, setSelectedProducts] = useState<{
    [productId: string]: number;
  }>({});

  // Helper functions
  const getTotalSelectedCount = () =>
    Object.values(selectedProducts).reduce((acc, count) => acc + count, 0);
  const getTotalPrice = () =>
    Object.entries(selectedProducts).reduce((total, [id, count]) => {
      const product = products?.find((p) => p.id === id);
      return total + (product ? product.discountedPrice * count : 0);
    }, 0);

  // Handlers
  const handleCardClick = (productId: string) => {
    const currentCount = selectedProducts[productId] || 0;
    if (currentCount < 3 && getTotalSelectedCount() < 3) {
      setSelectedProducts((prev) => ({...prev, [productId]: currentCount + 1}));
    }
  };

  const onSubmit = () => {
    if (getTotalSelectedCount() !== 3) {
      toast.error('Please select exactly 3 products to proceed');
      return;
    }

    setSelectProduct({
      products: Object.entries(selectedProducts)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => ({productId: id, quantity: count})),
    });
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen bg-gradient-to-br p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
          
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
              Select Your Products
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Tap products to select (maximum 3 items total)
            </p>
            <div className="mt-4 flex justify-center">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {getTotalSelectedCount()}/3 selected
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products?.map((product) => {
                const count = selectedProducts[product.id] || 0;
                const canAddMore = count < 3 && getTotalSelectedCount() < 3;

                return (
                  <div
                    key={product.id}
                    onClick={() => handleCardClick(product.id)}
                    className={`dark:bg-gray-800 relative cursor-pointer overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
                      count > 0
                        ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {/* Selected Indicator */}
                    {count > 0 && (
                      <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        {count}
                      </div>
                    )}

                    {/* Product Image Placeholder */}
                    <div className="bg-gray-100 dark:bg-gray-700 mb-3 flex h-40 items-center justify-center rounded-lg">
                      <span className="text-gray-400">Product Image</span>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-gray-900 text-lg font-bold dark:text-white">
                            ₹{product.discountedPrice}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500 ml-2 text-sm line-through">
                            ₹{product.actualPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProducts((prev) => {
                            const current = prev[product.id] || 0;
                            const updated = {
                              ...prev,
                              [product.id]: current - 1,
                            };
                            if (updated[product.id] <= 0)
                              delete updated[product.id];
                            return updated;
                          });
                        }}
                        disabled={count === 0}
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          count > 0
                            ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                        } transition-colors`}
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>

                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {count} selected
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canAddMore) {
                            setSelectedProducts((prev) => ({
                              ...prev,
                              [product.id]: count + 1,
                            }));
                          }
                        }}
                        disabled={!canAddMore}
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          canAddMore
                            ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                        } transition-colors`}
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 sticky bottom-0 rounded-xl border-t dark:bg-meta-4 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Total selected
                  </p>
                  <p className="text-gray-900 text-xl font-bold dark:text-white">
                    ₹{getTotalPrice().toLocaleString()}
                  </p>
                </div>
                <GenericButton
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-lg"
                >
                  Continue to Contact
                </GenericButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
