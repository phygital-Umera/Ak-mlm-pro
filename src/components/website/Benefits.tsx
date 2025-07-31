import React from 'react';

const benefits = [
  {
    title: 'Benefit ONE',
    description:
      'Create your account and explore our exclusive lifestyle, mobility, and wellness offerings.',
  },
  {
    title: 'Benefit TWO',
    description:
      'Choose from a wide range of EV bikes, wellness subscriptions, or smart tech gadgets.',
  },
  {
    title: 'Benefit THREE',
    description:
      'Track your product usage, service plans, and stay updated through your dashboard.',
  },
  {
    title: 'Benefit FOUR',
    description:
      'Access personalized lifestyle upgrades curated just for you by Siggmalyf.',
  },
  {
    title: 'Benefit FIVE',
    description:
      'Enjoy seamless mobility services and wellness support, all in one platform.',
  },
  {
    title: 'Benefit SIX',
    description:
      'Get priority support and special rewards as a valued Siggmalyf member.',
  },
];

const BenefitsSection = () => {
  return (
    <section className="bg-slate-50 py-5">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-slate-400"></div>
            KEY BENEFITS
          </div>

          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Highlight the Biggest Benefits
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Discover why thousands choose our platform for their lifestyle and
            wellness needs
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 transition-colors duration-300 group-hover:bg-slate-200">
                  <svg
                    className="h-4 w-4 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-slate-700">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
