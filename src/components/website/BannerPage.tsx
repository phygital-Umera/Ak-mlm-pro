import React from 'react';
import BannerTms from '@/assets/images/banner/bannerTms.png';

// BannerPage.tsx
const BannerPage: React.FC = () => {
  return (
    <section className="relative mt-28 h-[25vh] w-full sm:h-[30vh] md:h-[40vh] lg:h-[70vh]">
      <img
        src="https://npspension.co.in/nps-banner1.png"
        alt="Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
};

export default BannerPage;
