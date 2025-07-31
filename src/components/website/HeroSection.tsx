import React, {useRef, useState} from 'react';
import Video from '../../assets/images/hero/Video.mp4';
import {
  FaPlay,
  FaPause,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
} from 'react-icons/fa';

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // const togglePlay = () => {
  //   const vid = videoRef.current;
  //   if (!vid) return;
  //   if (vid.paused) {
  //     vid.play();
  //     setIsPlaying(true);
  //   } else {
  //     vid.pause();
  //     setIsPlaying(false);
  //   }
  // };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header Badge */}
        <div className="mb-8 mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            PUNE-BASED HYPER-AUTOMATION VENTURE
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Siggmalyf Ventures
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powering Growth Through
            </span>
            <span className="block text-blue-600">Smart Automation</span>
          </h1>

          <p className="text-gray-600 mx-auto max-w-3xl text-lg leading-relaxed">
            Established in 2025 and headquartered in Pune, Maharashtra, India.
            We deliver cutting-edge automation solutions that boost operational
            efficiency and drive business growth.
          </p>
        </div>

        {/* Video Section */}
        {/* <div className="mb-16"> */}
        {/* <div className="relative mx-auto max-w-4xl"> */}
        {/* <div className="border-gray-200/50 relative overflow-hidden rounded-2xl border shadow-2xl">
              <video
                ref={videoRef}
                src={Video}
                poster="/assets/images/video-poster.jpg"
                className="aspect-video w-full object-cover"
                onClick={togglePlay}
              /> */}

        {/* Play/Pause Button */}
        {/* <button
                onClick={togglePlay}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                  {isPlaying ? (
                    <FaPause className="text-gray-800 ml-0.5 text-2xl" />
                  ) : (
                    <FaPlay className="text-gray-800 ml-1 text-2xl" />
                  )}
                </div>
              </button> */}

        {/* Video Overlay Gradient */}
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div> */}
        {/* </div>
        </div>

        {/* Company Info Cards */}
        {/* Company Info Cards - Horizontal Scroll on Mobile, Grid on md+ */}
        <div className="scrollbar-hide flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6">
          {/* Card 1 */}
          <div className="border-gray-100 min-w-[250px] flex-shrink-0 rounded-xl border bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:min-w-0">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FaCalendarAlt className="text-xl text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2 text-2xl font-bold">
              Founded 2025
            </h3>
            <p className="text-gray-600">New-age automation company</p>
          </div>

          {/* Card 2 */}
          <div className="border-gray-100 min-w-[250px] flex-shrink-0 rounded-xl border bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:min-w-0">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <FaMapMarkerAlt className="text-xl text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2 text-2xl font-bold">
              Pune Based
            </h3>
            <p className="text-gray-600">Maharashtra, India</p>
          </div>

          {/* Card 3 */}
          <div className="border-gray-100 min-w-[250px] flex-shrink-0 rounded-xl border bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:min-w-0">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <FaEnvelope className="text-xl text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2 text-xl font-bold">
              Get In Touch
            </h3>
            <p className="font-medium text-blue-600">siggmalyf@gmail.com</p>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="inline-flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => alert('Contact Us clicked')}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>

            <button
              onClick={() => alert('Schedule Call clicked')}
              className="border-gray-300 text-gray-700 rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg"
            >
              Schedule a Call
            </button>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            Ready to explore collaboration opportunities? Let&apos;s discuss how
            we can boost your operational efficiency.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
