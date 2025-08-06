import React, {useState} from 'react';
import icon1 from '../../assets/images/product/icon1.png';
import icon2 from '../../assets/images/product/icon2.png';
import icon4 from '../../assets/images/product/icon4.png';
import icon5 from '../../assets/images/product/icon5.png';
import icon6 from '../../assets/images/product/icon6.png';
import Movie from '../../assets/images/product/movieimg.jpg';
import Shopping from '../../assets/images/product/shopping.jpg';
import Epay from '../../assets/images/product/epay.jpg';
import Holiday from '../../assets/images/product/holiday.jpg';
import Food from '../../assets/images/product/foods.jpg';
import A1 from '../../assets/images/product/a1.png';
import {
  MapPin,
  Users,
  Calendar,
  Star,
  Globe,
  Mountain,
  Plane,
} from 'lucide-react';

const partners = [icon1, icon2, icon4, icon5, icon6];

const domesticPackages = [
  {
    title: 'Domestic Holiday Packages',
    category:
      'Exclusive deals on hotels, resorts, and heritage properties across India.',
    description:
      'Popular destinations include: Goa, Kerala Backwaters, Himachal, Uttarakhand, Rajasthan, Northeast India.',
    price: '₹15,999',
    duration: '4D/3N',
    icon: '🏖️',
    color: 'bg-blue-50',
    accent: 'bg-blue-500',
  },
  {
    title: 'International Holiday Packages',
    category: 'Curated travel experiences across:',
    description:
      'Asia: Thailand, Singapore, Malaysia, Dubai. Europe: Switzerland, Paris, Italy. America: USA highlights, Caribbean cruises. Australia & New Zealand',
    price: '₹18,999',
    duration: '5D/4N',
    icon: '🛶',
    color: 'bg-green-50',
    accent: 'bg-green-500',
  },
];

const specializedTours = [
  {name: 'Cultural Tours', icon: '🎭'},
  {name: 'Pilgrimage Packages', icon: '🙏'},
  {name: 'Wellness Retreats', icon: '🧘'},
  {name: 'Corporate Groups', icon: '👥'},
];

const BannerPage = () => {
  const [activeTab, setActiveTab] = useState('domestic');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <h1 className="text-gray-900 mb-4 text-4xl font-bold md:text-5xl">
            SIGGMA Holidays
          </h1>
          <p className="text-gray-600 mx-auto max-w-3xl text-lg leading-relaxed">
            Premium travel experiences blending luxury, adventure, and
            affordability. Curated for families, corporate groups, and solo
            travelers.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Tab Navigation */}

        {/* Packages Grid */}
        <div className="mx-auto mb-16 grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:max-w-2xl lg:max-w-4xl">
          {domesticPackages.map((pkg, index) => (
            <div
              key={index}
              className={`${pkg.color} border-gray-200 overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">{pkg.icon}</span>
                  <span className="text-gray-600 rounded-full bg-white px-2 py-1 text-xs font-medium">
                    {pkg.category}
                  </span>
                </div>

                <h3 className="text-gray-900 mb-2 text-xl font-bold">
                  {pkg.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {pkg.description}
                </p>

                <div className="mb-6 flex items-center justify-between">
                  <div className="text-gray-500 flex items-center gap-4 text-sm"></div>
                  <div className="text-right">
                    <div className="text-gray-900 text-xl font-bold">
                      {pkg.price}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className={`${pkg.accent} w-full rounded-lg py-3 font-medium text-white transition-opacity hover:opacity-90`}
                  >
                    Book Now
                  </button>
                  <button className="border-gray-200 text-gray-700 hover:bg-gray-50 w-full rounded-lg border bg-white py-3 font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
