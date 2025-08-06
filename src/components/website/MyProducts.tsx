import React from 'react';
import product1 from '../../assets/images/product/product1.jpg';
import product2 from '../../assets/images/product/product2.jpg';
import product3 from '../../assets/images/product/product3.jpg';
import product4 from '../../assets/images/product/product5.jpg';
import Footer from './FooterSection';
import Header from '../HomePage/Header';

const products = [
  {
    title: 'SIGGMA Water Ionizer',
    description:
      'Advanced ionized water system for a healthier lifestyle and better hydration.',
    image: product1,
  },
  {
    title: 'SIGGMA Electric Bicycle',
    description:
      'Eco-friendly e-bike with long battery life, designed for urban commutes.',
    image: product2,
  },
  {
    title: 'SIGGMA Cycle Specs',
    description:
      'Detailed specs of our electric bike, combining style, speed, and strength.',
    image: product3,
  },
  {
    title: 'SIGGMA Clean Water',
    description:
      'Delivers innovative water purification solutions designed for efficiency, sustainability, and safe drinking water access.',
    image: product4,
  },
];

const MyProducts: React.FC = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-30 text-center">
        <h2 className="text-gray-800 text-4xl font-bold">
          Our <span className="text-blue-600">Product Showcase</span>
        </h2>
        <p className="text-gray-600 mx-auto mt-4 max-w-2xl text-lg">
          Discover how SIGGMAlyf products are reshaping smart mobility and
          lifestyle innovation.
        </p>
      </div>

      {/* Product Grid */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Horizontal scroll on mobile */}
          <div className="flex gap-6 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="w-full min-w-[250px] overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg sm:min-w-0"
              >
                {/* Image wrapper with hover zoom effect */}
                <div className="aspect-w-4 aspect-h-3 group overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-gray-800 text-lg font-semibold">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyProducts;
