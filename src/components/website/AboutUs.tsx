import React from 'react';
import step1 from '../../assets/images/product/step1.png';

const reviews = [
  {
    name: 'Marketing Team',
    title: 'Siggmalyf Business Promo',
    review:
      'Discover how Siggmalyf is transforming business marketing across industries.',
    image: step1,
  },
  {
    name: 'Elon Musk',
    title: 'CEO, Tesla & SpaceX',
    review: 'Siggmalyf helped streamline employee wellness at Tesla.',
    image: step1,
  },
  {
    name: 'Hans Zimmer',
    title: 'Award-winning Composer',
    review:
      'The personalized experiences offered by Siggmalyf are simply mind-blowing.',
    image: step1,
  },
];

const AboutUs = () => {
  return (
    <section className="bg-slate-50 py-5">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-slate-400"></div>
            EXPERT TESTIMONIALS
          </div>

          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Reviews From The Experts
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Hear what industry leaders and experts have to say about their
            experience with Siggmalyf
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-8 md:grid md:grid-cols-3">
          {reviews.map((expert, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  &quot;{expert.review}&quot;
                </p>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <span className="text-sm font-semibold text-slate-600">
                      {expert.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {expert.name}
                    </p>
                    <p className="text-xs text-slate-500">{expert.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="block md:hidden">
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6 px-4" style={{width: 'max-content'}}>
              {reviews.map((expert, index) => (
                <div
                  key={index}
                  className="min-w-[320px] max-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                      &quot;{expert.review}&quot;
                    </p>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <span className="text-xs font-semibold text-slate-600">
                          {expert.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {expert.name}
                        </p>
                        <p className="text-xs text-slate-500">{expert.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
