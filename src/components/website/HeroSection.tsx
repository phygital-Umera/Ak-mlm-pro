import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import banner1 from '../../assets2/Images/slider1.png';
import banner2 from '../../assets2/Images/slider2.png';
import banner3 from '../../assets2/Images/slider3.png';
import banner4 from '../../assets2/Images/slider.png';

const images: string[] = [banner1, banner2, banner3, banner4];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <>
      <section
        id="hero-section"
        className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="h-full w-full object-contain transition-all duration-500"
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

      {/* Promotional Message */}
      <div className="bg-white py-4 shadow-md">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-center text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="font-bold text-amber-500">
              100 Pair Matching By Flight and Train
            </span>
            <span className="mx-1 hidden sm:inline">•</span>
            <br className="sm:hidden" />
            <span>2 nights 3 days</span>
            <span className="mx-1 hidden sm:inline">•</span>
            <br className="sm:hidden" />
            <span className="font-bold text-amber-500">
              Ramoji Film City Tour
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
