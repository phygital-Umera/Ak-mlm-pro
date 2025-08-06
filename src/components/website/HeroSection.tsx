import React, {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

const images: string[] = [
  'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Dew_Garden_Fly_Web_banners_Main_Web_c19d703cf9.jpg',
  'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Anniversary_Offer_Web_Banner_07b843ead1.jpg',
  'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Dew_Garden_Fly_Web_banners_Main_Web_c19d703cf9.jpg',
  'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Anniversary_Offer_Web_Banner_07b843ead1.jpg',
  'https://prd-vestige-cms.s3.ap-southeast-1.amazonaws.com/Dew_Garden_Fly_Web_banners_Main_Web_c19d703cf9.jpg',
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="h-full w-full object-cover transition-all duration-500"
      />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 sm:left-4 sm:p-3"
      >
        <ChevronLeft size={20} className="sm:size-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 sm:right-4 sm:p-3"
      >
        <ChevronRight size={20} className="sm:size-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition duration-300 ${
              idx === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
