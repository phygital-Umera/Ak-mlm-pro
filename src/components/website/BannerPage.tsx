import React from 'react';
import BannerTms from '@/assets/images/banner/bannerTms.png';

const BannerPage: React.FC = () => {
  return (
    <section className="relative -mb-2 h-[25vh] w-full overflow-hidden sm:h-[30vh] md:h-[30vh] lg:h-[40vh]">
      <img
        src={BannerTms}
        alt="Banner"
        className="absolute left-1/2 top-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </section>
  );
};

export default BannerPage;
