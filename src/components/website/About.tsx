import React from 'react';
import Footer from './FooterSection';
import Header from '../HomePage/Header';

const leaders = [
  {
    name: 'Mr. Mahesh Gondhali',
    role: 'CEO',
    description:
      'The Visionary Strategist with 25+ years of experience in the Pharmaceutical Industry, steering innovation and growth.',
    image: '/path-to-image/ceo.jpg',
  },
  {
    name: 'Mr. Mayur Ingale',
    role: 'Director',
    description:
      'The Sales Catalyst & Network Architect with 20+ years in Sales & Marketing, driving robust channel development and direct selling.',
    image: '/path-to-image/director1.jpg',
  },
  {
    name: 'Mr. Mahesh Gavane',
    role: 'Director',
    description:
      'The Marketing Maestro with Financial & IT Acumen, with 15+ years of strategic branding and operational leadership.',
    image: '/path-to-image/director2.jpg',
  },
];

const About = () => {
  return (
    <>
      <Header />

      <div className="bg-gray-50 h-auto min-h-screen w-full py-14">
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-gray-900 mb-4 text-4xl font-bold md:text-5xl">
              About <span className="text-blue-600"> Siggmalyf Ventures</span>
            </h1>
            <p className="text-gray-600 text-xl">
              Transforming lives through innovation and excellence
            </p>
          </div>
        </div>
        {/* Company Info Section */}
        <div className="bg-gray-100 py-12">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-10 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              {/* <h2 className="text-gray-900 mb-10 text-center text-3xl font-bold">
                About Siggmalyf Ventures
              </h2> */}

              <div className="grid gap-10 md:grid-cols-2">
                {/* Company Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <i className="fas fa-building"></i>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Company Name</p>
                      <h3 className="text-gray-800 text-lg font-semibold">
                        Siggmalyf Ventures Pvt Ltd
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Established</p>
                      <h3 className="text-gray-800 text-lg font-semibold">
                        2025
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Headquarters</p>
                      <h3 className="text-gray-800 text-lg font-semibold">
                        Pune, Maharashtra, India
                      </h3>
                    </div>
                  </div>
                </div>

                {/* About Company */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-gray-900 mb-4 text-xl font-semibold">
                    Who We Are
                  </h3>
                  <p className="text-gray-700 text-justify leading-relaxed">
                    Siggmalyf Ventures Pvt Ltd is a future-ready lifestyle
                    brand, revolutionizing health, mobility, and smart living
                    with cutting-edge products. Backed by a strong direct
                    selling model, we’re dedicated to providing sustainable and
                    enriching experiences that uplift daily lives while
                    promoting wellness, innovation, and a connected ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-gray-900 mb-12 text-center text-3xl font-bold">
              Leadership Team
            </h2>

            {/* Horizontal scroll on small screens, grid on md+ */}
            <div className="no-scrollbar flex space-x-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-8 md:space-x-0 lg:grid-cols-3">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="min-w-[280px] flex-shrink-0 rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg md:min-w-0"
                >
                  <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="border-gray-100 h-28 w-28 rounded-full border-4 object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leader.name,
                        )}&size=128&background=6366f1&color=fff`;
                      }}
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-gray-900 mb-1 text-xl font-bold">
                        {leader.name}
                      </h3>
                      <p className="mb-2 text-sm font-medium text-blue-600">
                        {leader.role}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
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

export default About;
