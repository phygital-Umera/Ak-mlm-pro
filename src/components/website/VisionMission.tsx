import React from 'react';

const VisionMission = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 md:pr-6">
            <div className="text-content space-y-6">
              <h2 className="text-3xl font-bold text-black">
                Our Vision Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To build the NETWORK of well professionals for RETIREMENT
                PLANNING to HELP and GUIDEthe public to develop the habits of
                saving through EFFECTIVEfinancial tools for the WEALTH CREATION
                to secure their OLD AGE income.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="hidden w-full justify-center md:flex md:w-1/2">
            <div className="image-container">
              <img
                src="https://npspension.co.in/vison.png"
                alt="Our Vision"
                className="h-auto max-w-[320px] rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
