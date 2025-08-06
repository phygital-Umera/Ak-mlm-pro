import React, {useState} from 'react';
import icon1 from '../../assets/images/product/icon1.png';
import icon2 from '../../assets/images/product/icon2.png';
import icon4 from '../../assets/images/product/icon4.png';
import icon5 from '../../assets/images/product/icon5.png';
import icon6 from '../../assets/images/product/icon6.png';

const partners = [icon1, icon2, icon4, icon5, icon6];

const domesticPackages = [
  {
    title: 'Domestic Holiday Packages',
    img: 'https://png.pngtree.com/png-vector/20210602/ourmid/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg',
    description:
      'Popular destinations include: Goa, Kerala Backwaters, Himachal, Uttarakhand, Rajasthan, Northeast India.',
    price: '₹15,999',
    color: 'bg-blue-50',
    accent: 'bg-blue-500',
  },
  {
    title: 'International Holiday Packages',
    img: 'https://png.pngtree.com/png-vector/20210602/ourmid/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg',
    description:
      'Asia: Thailand, Singapore, Malaysia, Dubai. Europe: Switzerland, Paris, Italy. America: USA highlights, Caribbean cruises. Australia & New Zealand',
    price: '₹18,999',
    color: 'bg-green-50',
    accent: 'bg-green-500',
  },
  {
    title: 'International Holiday Packages',
    img: 'https://png.pngtree.com/png-vector/20210602/ourmid/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323.jpg',
    description:
      'Asia: Thailand, Singapore, Malaysia, Dubai. Europe: Switzerland, Paris, Italy. America: USA highlights, Caribbean cruises. Australia & New Zealand',
    price: '₹18,999',
    color: 'bg-green-50',
    accent: 'bg-green-500',
  },
];

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('domestic');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center">
          <h1 className="text-gray-900 text-3xl font-bold md:text-4xl">
            Products
          </h1>
        </div>
      </div>

      {/* Packages */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="p-4">
                <h3 className="text-gray-900 text-lg font-semibold">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 mt-1 text-sm">{pkg.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-800 text-base font-semibold">
                    {pkg.price}
                  </span>
                </div>

                {/* Action buttons - Optional */}
                {/* <div className="mt-4 space-y-2">
                  <button className={`${pkg.accent} w-full rounded-md py-2 text-white text-sm font-medium hover:opacity-90`}>
                    Book Now
                  </button>
                  <button className="w-full rounded-md border border-gray-300 bg-white py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View Details
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
