import React from 'react';
import growtifyLogo from '../../assets/images/banner/card1.jpg';
import techboxLogo from '../../assets/images/banner/card2.jpg';
import forecastrLogo from '../../assets/images/banner/card3.jpg';
import unitedLogo from '../../assets/images/banner/card4.jpg';
import rocketFactoryLogo from '../../assets/images/banner/card5.jpg';
import Footer from './FooterSection';
import Header from '../HomePage/Header';

const companies = [
  {
    name: 'Growtify',
    logo: growtifyLogo,
    description:
      'Growtify helps startups scale rapidly with cutting-edge growth strategies.',
    category: 'Growth & Strategy',
  },
  {
    name: 'TECHBOX',
    logo: techboxLogo,
    description:
      'TECHBOX offers smart tech solutions for modern business challenges.',
    category: 'Technology Solutions',
  },
  {
    name: 'Forecastr',
    logo: forecastrLogo,
    description:
      'Forecastr provides data-driven forecasts and predictive analytics.',
    category: 'Data Analytics',
  },
  {
    name: 'UNITED',
    logo: unitedLogo,
    description:
      'UNITED connects global talent with dynamic enterprise opportunities.',
    category: 'Talent Solutions',
  },
  {
    name: 'ROCKET FACTORY',
    logo: rocketFactoryLogo,
    description:
      'Rocket Factory engineers next-gen EVs and mobility innovations.',
    category: 'EV & Mobility',
  },
];

const MyCompanies = () => {
  return (
    <>
      <Header />

      <div className="from-gray-50 to-gray-100 min-h-screen bg-gradient-to-br py-16">
        {/* Hero Section */}
        <div className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="text-center">
              <h1 className="text-gray-900 mb-4 text-5xl font-bold">
                Our <span className="text-blue-600">Companies</span>
              </h1>
              <p className="text-gray-600 mx-auto max-w-3xl text-xl">
                Discover the innovative companies in our portfolio driving
                growth, technology, and transformation across various
                industries.
              </p>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            {/* Horizontal scroll on small screens, grid on md+ */}
            <div className="scrollbar-hide flex gap-6 overflow-x-auto md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="group min-w-[280px] flex-shrink-0 rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:min-w-0"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="bg-gray-100 text-gray-800 inline-block rounded-full px-3 py-1 text-xs font-medium">
                        {company.category}
                      </span>
                    </div>

                    <h3 className="text-gray-900 mb-3 text-xl font-bold transition-colors duration-200 group-hover:text-blue-600">
                      {company.name}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {company.description}
                    </p>

                    <button className="bg-gray-50 text-gray-700 w-full rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 group-hover:shadow-md">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCompanies;
