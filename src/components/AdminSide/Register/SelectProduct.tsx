import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useRegistration} from '@/context/RegisterContext';
import {useGetAllProducts} from '@/lib/react-query/Admin/Product/products';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

interface SponserInfoProps {
  onNext: () => void;
}

export const SelectProduct: React.FC<SponserInfoProps> = ({onNext}) => {
  const methods = useForm({defaultValues: {}});
  const {setSelectProduct} = useRegistration();
  const {data: products, isLoading} = useGetAllProducts();
  const {data} = useRegistration();

  // Debug logging
  console.log('All products:', products);
  console.log('Registration context data:', data);
  console.log('Sponsor info:', data.sponsorInfo);
  console.log('Epin data from context:', data.sponsorInfo?.epinData);
  console.log('Epin data type:', typeof data.sponsorInfo?.epinData);

  // Convert epinData to number for comparison
  const epinValue = Number(data.sponsorInfo?.epinData);
  console.log('Converted epin value:', epinValue, 'Type:', typeof epinValue);

  // Filter products based on discounted price
  const filteredProducts = products?.filter((product) => {
    console.log(
      `Comparing: product price ${product.discountedPrice} (${typeof product.discountedPrice}) with epin ${epinValue} (${typeof epinValue})`,
    );
    return product.discountedPrice === epinValue;
  });

  // If no products match, show all products as fallback
  const productsToShow = filteredProducts?.length ? filteredProducts : products;

  console.log('Filtered products:', filteredProducts);
  console.log('Products to show:', productsToShow);

  const [selectedProducts, setSelectedProducts] = useState<{
    [productId: string]: number;
  }>({});

  // Auto-select first product when products are loaded
  useEffect(() => {
    if (productsToShow && productsToShow.length > 0) {
      const firstProduct = productsToShow[0];
      console.log('Auto-selecting first product:', firstProduct);
      setSelectedProducts({[firstProduct.id]: 1});
    }
  }, [productsToShow]);

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
    setSelectedProducts({[productId]: 1}); // selecting one replaces the previous selection
  };

  const onSubmit = () => {
    if (getTotalSelectedCount() !== 1) {
      toast.error('Please select exactly 1 product to proceed');
      return;
    }

    setSelectProduct({
      products: Object.entries(selectedProducts)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => ({productId: id, quantity: count})),
    });
    onNext();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen bg-gradient-to-br p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading products...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen bg-gradient-to-br p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white sm:text-3xl">
              Select Your Products
            </h1>
            {data.sponsorInfo?.epinData && (
              <p className="text-gray-600 dark:text-gray-400">
                Showing products priced at ₹{epinValue}
              </p>
            )}
          </div>

          {/* Product Grid */}
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {!productsToShow || productsToShow.length === 0 ? (
              <div className="dark:bg-gray-800 rounded-xl bg-white py-12 text-center shadow-sm">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found
                </p>
                <p className="text-gray-400 dark:text-gray-500 mt-2 text-sm">
                  {products?.length
                    ? `Available products: ${products.map((p) => `${p.name} (₹${p.discountedPrice})`).join(', ')}`
                    : 'No products available in the system'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {productsToShow.map((product) => {
                    const count = selectedProducts[product.id] || 0;

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleCardClick(product.id)}
                        className={`dark:bg-gray-800 relative cursor-pointer overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
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

                        {/* Product Image */}
                        <div className="bg-gray-100 dark:bg-gray-700 mb-3 flex h-40 items-center justify-center rounded-lg">
                          {product.images ? (
                            <img
                              src={product.images}
                              alt={product.name}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://via.placeholder.com/150?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="text-gray-400 dark:text-gray-500 text-center">
                              <svg
                                className="mx-auto mb-2 h-12 w-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
                            {product.name || 'Unnamed Product'}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm">
                            {product.description || 'No description available'}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <span className="text-gray-900 text-lg font-bold dark:text-white">
                                ₹{product.discountedPrice}
                              </span>
                              {product.actualPrice > 0 && (
                                <span className="text-gray-400 dark:text-gray-500 ml-2 text-sm line-through">
                                  ₹{product.actualPrice}
                                </span>
                              )}
                            </div>
                            {product.productSubType && (
                              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded px-2 py-1 text-xs">
                                {product.productSubType}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                {getTotalSelectedCount() > 0 && (
                  <div className="dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 sticky bottom-0 rounded-xl border-t bg-white/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Selected Products: {getTotalSelectedCount()}
                        </p>
                        <p className="text-gray-900 text-xl font-bold dark:text-white">
                          Total: ₹{getTotalPrice().toLocaleString()}
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
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
