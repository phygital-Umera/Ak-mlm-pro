import React from 'react';

const BannerPage: React.FC = () => {
  const bannerImage =
    'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Anniversary_Offer_Web_Banner_07b843ead1.jpg';

  return (
    <section className="mb-8 h-[25vh] w-full overflow-hidden sm:h-[30vh] md:h-[30vh] lg:h-[40vh]">
      <img
        src={bannerImage}
        alt="Banner"
        className="h-full w-full object-cover"
      />
    </section>
  );
};

export default BannerPage;
