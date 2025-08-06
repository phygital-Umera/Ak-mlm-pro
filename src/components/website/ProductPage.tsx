import React, {useState} from 'react';
import step1 from '../../assets/images/product/getting.jpg';
import step2 from '../../assets/images/product/Catalogue.png';
import step3 from '../../assets/images/product/magnet.png';
import step4 from '../../assets/images/product/marketing.jpg';
import step5 from '../../assets/images/product/step5.jpg';
import step6 from '../../assets/images/product/step6.1.jpg';

const steps = [
  {
    step: 1,
    title: 'Getting Started with Siggmalyf',
    description:
      'Create your account and explore our exclusive lifestyle, mobility, and wellness offerings.',
    points: [],
    image: step1,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    step: 2,
    title: 'Choose Your Product',
    description:
      'Discover our curated selection of premium products designed for your lifestyle.',
    points: [
      'Select from wellness, EV bikes, or smart gadgets.',
      'Tailored packages to fit every lifestyle.',
    ],
    image: step2,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    step: 3,
    title: 'Connect with Your Advisor',
    description:
      'Get one-on-one support from a trained advisor to guide your product journey.',
    points: [],
    image: step3,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    step: 4,
    title: 'Join the Community',
    description:
      'Become part of our thriving network of entrepreneurs and innovators.',
    points: [
      'Access our direct selling network.',
      'Get resources to grow and earn.',
    ],
    image: step4,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  // {
  //   step: 5,
  //   title: 'Experience the Difference',
  //   description:
  //     'Use our products and see real transformation in health, convenience, and lifestyle.',
  //   points: [],
  //   image: step5,
  //   color: 'from-indigo-500 to-blue-500',
  //   bgColor: 'bg-indigo-50',
  //   iconBg: 'bg-indigo-100',
  //   iconColor: 'text-indigo-600',
  // },
  // {
  //   step: 6,
  //   title: 'Grow with Siggmalyf',
  //   description:
  //     'Scale your success and build a sustainable income stream with our proven system.',
  //   points: [
  //     'Earn income through referrals.',
  //     'Level up with leadership and rewards.',
  //   ],
  //   image: step6,
  //   color: 'from-green-500 to-emerald-500',
  //   bgColor: 'bg-green-50',
  //   iconBg: 'bg-green-100',
  //   iconColor: 'text-green-600',
  // },
];

const ProductPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            HOW IT WORKS
          </div>
          <h1 className="text-gray-900 mb-6 text-4xl font-bold md:text-5xl">
            Your Journey to Success in
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              6 Simple Steps
            </span>
          </h1>
          <p className="text-gray-600 mx-auto max-w-3xl text-lg">
            Follow our proven pathway to transform your lifestyle and build a
            thriving business with Siggmalyf
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="mb-8 block md:hidden">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 px-4" style={{width: 'max-content'}}>
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="border-gray-100 min-w-[320px] overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={step.image}
                      alt={`Step ${step.step}`}
                      className="h-48 w-full object-cover"
                    />
                    <div
                      className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r font-bold text-white ${step.color} shadow-lg`}
                    >
                      {step.step}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-gray-900 mb-3 text-xl font-bold">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                    {step.points.length > 0 && (
                      <ul className="mb-6 space-y-2">
                        {step.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600 flex items-start gap-2"
                          >
                            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      className={`w-full rounded-xl bg-gradient-to-r py-3 font-semibold text-white ${step.color} shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`mb-20 flex items-center gap-16 ${
                index % 2 !== 0 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Content Section */}
              <div className="flex-1">
                <div
                  className={`mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2 ${step.bgColor}`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r font-bold text-white ${step.color}`}
                  >
                    {step.step}
                  </div>
                  <span className={`text-sm font-semibold ${step.iconColor}`}>
                    STEP {step.step}
                  </span>
                </div>

                <h2 className="text-gray-900 mb-4 text-3xl font-bold">
                  {step.title}
                </h2>

                {step.description && (
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {step.description}
                  </p>
                )}

                {step.points.length > 0 && (
                  <ul className="mb-8 space-y-3">
                    {step.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 flex items-start gap-3"
                      >
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${step.iconBg} mt-0.5`}
                        >
                          <svg
                            className={`h-3 w-3 ${step.iconColor}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white ${step.color} shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Today
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
                </button>
              </div>

              {/* Image Section */}
              <div className="flex-1">
                <div className="group relative">
                  <img
                    src={step.image}
                    alt={`Step ${step.step}`}
                    className="h-96 w-full rounded-2xl object-cover shadow-2xl transition-all duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                  ></div>
                  <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                    <span
                      className={`bg-gradient-to-r text-2xl font-bold ${step.color} bg-clip-text text-transparent`}
                    >
                      {step.step}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="mt-20 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white md:p-12">
            <h3 className="mb-4 text-3xl font-bold">
              Ready to Start Your Journey?
            </h3>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of successful entrepreneurs who have transformed
              their lives with Siggmalyf
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                Start Now
              </button>
              <button className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-600">
                Learn More
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductPage;
