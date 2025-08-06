// src/components/AccordionSection.jsx
import React, {useState} from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';

const steps = [
  {
    title: 'Step/Module/Feature ONE',
    content:
      'Purus non enim praesent elementum. In mollis nunc sed id semper. Justo donec enim diam vulputate ut pharetra sit amet. Pulvinar proin gravida hendrerit lectus a. Diam ut venenatis tellus in.',
  },
  {
    title: 'Step/Module/Feature TWO',
    content:
      'Content for feature two goes here. Customize it as needed for your project.',
  },
  {
    title: 'Step/Module/Feature THREE',
    content:
      'Content for feature three goes here. Explain your process step-by-step.',
  },
  {
    title: 'Step/Module/Feature FOUR',
    content:
      'Content for feature four goes here. You can highlight technical features here.',
  },
  {
    title: 'Step/Module/Feature FIVE',
    content:
      'Content for feature five goes here. Add benefits, modules, or use cases.',
  },
];

const MissionVision = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          How We Deliver Exceptional Results
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Explore the key steps and features that define our approach. We
          combine innovation and clarity to drive success for every user.
        </p>
      </div>

      {/* Accordion */}
      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
        {steps.map((step, index) => (
          <li key={index} className="transition-all duration-300">
            <button
              className={`group flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-200 focus:outline-none ${
                activeIndex === index
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={() => toggleIndex(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="text-lg font-medium">{step.title}</span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'rotate-180 bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                }`}
              >
                {activeIndex === index ? (
                  <FaMinus className="h-3 w-3" />
                ) : (
                  <FaPlus className="h-3 w-3" />
                )}
              </span>
            </button>

            <div
              id={`accordion-content-${index}`}
              className={`overflow-hidden px-6 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-[500px] pb-5' : 'max-h-0'
              }`}
            >
              <div className="border-t border-slate-200 pt-4 text-base leading-relaxed text-slate-600">
                {step.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default MissionVision;
