import React from 'react';

const services = [
  {
    img: 'https://npspension.co.in/images/Services/1.png',
    title: 'Financial Planning',
    desc: 'The main elements of a financial plan include a retirement strategy, a risk management plan, a long-term investment plan, a tax reduction strategy, and an estate plan.',
  },
  {
    img: 'https://npspension.co.in/images/Services/2.png',
    title: 'Investments Management',
    desc: 'Investment management refers to the handling of financial assets and other investments—not only buying and selling them.',
  },
  {
    img: 'https://npspension.co.in/images/Services/3.png',
    title: 'Taxes Planning',
    desc: "Tax planning is the analysis of one's financial situation from a tax efficiency point of view so as to plan one's finances in the most optimized manner.",
  },
  {
    img: 'https://npspension.co.in/images/Services/6.png',
    title: 'Retirement Management',
    desc: 'Many retirement planners suggest the typical 401(k) portfolio generates an average annual return of 5% to 8% based on market conditions.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 text-center text-[#2E363A] transition duration-300 hover:shadow-lg"
            >
              <img
                src={service.img}
                alt={service.title}
                className="mx-auto mb-4 h-20 object-contain"
              />
              <h4 className="mb-2 text-lg font-semibold">{service.title}</h4>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
