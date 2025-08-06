import React from 'react';

const ConnectingPeoplePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-white px-8 py-30">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Image mosaic */}
        <img
          src="https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Business_Opportunities_01dbaae13a.jpg"
          alt="Image"
          className="rounded-xl"
        />

        {/* Right side - Content */}
        <div className="">
          <h2 className="text-4xl font-bold leading-tight text-blue-600 md:text-5xl">
            About Us
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            The starting point for every journey is knowledge, if you have the
            knowledge about the path on which you have to travel, then the
            journey is going to be easier and more successful. We at Vestige,
            emphasize that when you register yourself as a Vestige Distributor,
            please read the Marketing Plan and understand the opportunity that
            can help you fulfil your dreams.
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
