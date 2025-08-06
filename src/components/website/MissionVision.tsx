import React from 'react';
import {FaBullseye, FaEye} from 'react-icons/fa';

const MissionVision = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-gray-800 text-4xl font-bold tracking-tight sm:text-5xl">
            Our Vision & Mission
          </h2>
          <p className="text-gray-600 mx-auto mt-4 max-w-2xl text-lg">
            Discover our core purpose and the transformative goals driving our
            journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Vision */}
          <div className="border-gray-200 group relative overflow-hidden rounded-2xl border bg-blue-50 p-8 transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3 text-blue-600">
              <span className="rounded-full bg-blue-100 p-3 text-xl transition-transform group-hover:rotate-6">
                <FaEye />
              </span>
              <h3 className="text-gray-800 text-2xl font-semibold">Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We are committed to becoming a global leader in the health and
              wellness sector, empowering individuals to not only achieve
              financial independence but also experience deep personal
              fulfillment. Our vision is to cultivate a thriving,
              health-conscious community supported by innovative wellness
              products and a transformative business network that fosters
              growth, collaboration, and success.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              We aim to inspire individuals to take control of their health and
              unlock their full potential. Together, we can build a future where
              health and personal success are within reach for everyone,
              anywhere.
            </p>
          </div>

          {/* Mission */}
          <div className="border-gray-200 group relative overflow-hidden rounded-2xl border bg-green-50 p-8 transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3 text-green-600">
              <span className="rounded-full bg-green-100 p-3 text-xl transition-transform group-hover:-rotate-6">
                <FaBullseye />
              </span>
              <h3 className="text-gray-800 text-2xl font-semibold">Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower and inspire individuals to unlock their
              full personal and professional potential. By providing premium,
              nature-based wellness products that enhance physical, mental, and
              emotional well-being, we aim to make a meaningful difference in
              people`s lives.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              We are dedicated to fostering a vibrant community built on
              encouragement, trust, and collaboration, where every individual
              feels supported in their journey toward growth and achievement.
              Together, we strive to create a world where wellness and success
              go hand in hand, empowering everyone to live their best life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
