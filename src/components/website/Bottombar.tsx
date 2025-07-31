import React from 'react';

export const Bottombar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white text-[#0c0505] shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[#0c0505]">
          <a href="#why" className="hover:underline">
            Why This Product
          </a>
          <a href="#about" className="hover:underline">
            About This Product
          </a>
          <a href="#testimonials" className="hover:underline">
            What People Say
          </a>
          <a href="#features" className="hover:underline">
            What You’ll Get
          </a>
          <a href="#mentor" className="hover:underline">
            Meet Your Mentor
          </a>
          <a href="#faq" className="hover:underline">
            FAQ
          </a>
        </div>

        {/* Button */}
        <button className="whitespace-nowrap rounded bg-[#0080e8] px-5 py-2 text-sm font-semibold text-white transition duration-300">
          JOIN NOW
        </button>
      </div>
    </div>
  );
};

export default Bottombar;
