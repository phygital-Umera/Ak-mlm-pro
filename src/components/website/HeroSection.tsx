import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import banner1 from '../../assets2/Images/slider1.png';
import banner2 from '../../assets2/Images/slider2.png';
import banner3 from '../../assets2/Images/slider3.png';
import banner4 from '../../assets2/Images/slider.png';

const images: string[] = [banner1, banner2, banner3, banner4];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
      {/* About Section (Welcome to NPS Pension) */}
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2">
          {/* Left Image */}
          <div>
            <img
              src="https://npspension.co.in/about.jpg"
              alt="About NPS"
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-[#2E363A]">
              Welcome to NPS Pension
            </h2>
            <p className="text-gray-600 mb-3">
              Our Company is the PIONEER organization working in RETIREMENT
              PLANNING for the old age income security for the public by the
              best and EFFECTIVE FINANCIAL TOOLS. Working more than seven years,
              we provided more than 500 HNI Clients RETIREMENT and TAX EFFICIENT
              solution through NATIONAL PENSION SYSTEM (NPS).
            </p>
            <p className="text-gray-600">
              We have been open more than 10000 NPS accounts on individual
              basis. Now, we provide CORPORATE services for RETIREMENT and TAX
              saving schemes through NATIONAL PENSION SYSTEM (NPS). We are the
              authorized service provider for NPS. Now, we look to grow in
              DIVERSE financial services like Mutual funds, General Insurance,
              Health Insurance, Life Insurance, Postal Services, and Home and
              Mortgage Loan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
