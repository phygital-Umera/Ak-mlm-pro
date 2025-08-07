import React, {useState} from 'react';
import icon1 from '../../assets2/products/sanitary.png';
import icon2 from '../../assets2/products/Barry.png';
import icon3 from '../../assets2/products/Baldand.png';

const domesticPackages = [
  {
    category: 'Women Hygiene',
    title: 'Stepwell (Sanitary Pad)',
    img: icon1,
    netContent: '18 Box (144 pcs)',
    mrp: '₹3600',
    discountPrice: '₹3150',
    color: 'bg-green-50',
    accent: 'bg-green-500',
  },
  {
    category: 'Health & Wellness',
    title: 'Super Berry (Berry Juice)',
    img: icon2,
    netContent: '3 Bottles / 500 ml',
    mrp: '₹5400',
    discountPrice: '₹3300',
    color: 'bg-blue-50',
    accent: 'bg-blue-500',
  },
  {
    category: 'Agriculture',
    title: 'Baldand 125(Growth promoter)',
    img: icon3,
    netContent: '4 Bottles / 1000 ml',
    mrp: '₹6000',
    discountPrice: '₹3600',
    color: 'bg-yellow-50',
    accent: 'bg-yellow-500',
  },
];

const ProductPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-black py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold text-white">Our Products</h1>
        <p className="text-gray-300 mt-2">
          Quality Products at the Best Prices
        </p>
      </div>

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domesticPackages.map((pkg, index) => (
            <div
              key={index}
              className={`${pkg.color} border-gray-200 overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <img
                src={pkg.img}
                alt={pkg.title}
                className="w-full object-cover"
              />
              <div className="p-5">
                <span className="text-gray-500 text-sm font-medium uppercase">
                  {pkg.category}
                </span>
                <h3 className="text-gray-900 text-xl font-semibold">
                  {pkg.title}
                </h3>
                <p className="text-gray-700 mt-1 text-sm">
                  <strong>Net Content:</strong> {pkg.netContent}
                </p>
                <div className="mt-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">MRP</span>
                    <span className="text-gray-500">{pkg.mrp}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold">
                    <span className="text-gray-900">Distributor Price</span>
                    <span className="text-green-600">{pkg.discountPrice}</span>
                  </div>
                </div>
                {/* CTA buttons can be enabled here */}
                {/* <button className={`${pkg.accent} mt-5 w-full py-2 rounded-md text-white text-sm font-semibold hover:opacity-90`}>
                  Buy Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
