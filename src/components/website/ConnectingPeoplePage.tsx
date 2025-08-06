import React from 'react';
import connectpeople from '../../assets2/products/conne.jpg';

const ConnectingPeoplePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-white px-8 py-30">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Image mosaic */}
        <img src={connectpeople} alt="Image" className="rounded-xl" />

        {/* Right side - Content */}
        <div className="">
          <h2 className="text-4xl font-bold leading-tight text-blue-600 md:text-5xl">
            About Us
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to TMS LIFE SOLUTION PVT LTD. Founded under the visionary
            leadership of Mr. Akshay Sanjay Kadam (Chairman & Managing
            Director), our company is driven by a bold mission — to empower
            youth through meaningful employment opportunities and deliver
            high-quality daily life essentials to every household. At TMS LIFE
            SOLUTION, we believe in creating value-driven networks that not only
            uplift individuals economically but also promote a healthier, more
            sustainable way of living. As a product-based MLM company, we focus
            on distributing premium health and wellness products, organic
            farming essentials, and a wide range of daily necessities that align
            with modern, conscious lifestyles. Our aim extends beyond business.
            We are committed to building a stable future across economic,
            social, health, and industrial sectors — areas that deeply impact
            human life today and tomorrow. With transparency, trust, and
            transformation at our core, TMS LIFE SOLUTION PVT LTD is not just a
            company — it’s a movement toward holistic growth and
            nation-building.
          </p>

          {/* <button className="group flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700">
            Start you business
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ConnectingPeoplePage;
