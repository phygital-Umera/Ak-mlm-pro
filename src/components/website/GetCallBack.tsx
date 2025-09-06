import React, {useState} from 'react';

const GetCallBack: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: 'Discussions with Financial Experts',
    name: '',
    phone: '',
  });

  const topics = [
    'Discussions with Financial Experts',
    'Meet Finance Assistant - PR Agency',
    'Discussions with Senior Finance Manager',
    'Designer',
    'Our CEO Finance Theme Group',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // 🔗 Send formData to backend API here
  };

  return (
    <section className="bg-[#2E363A] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Get a Call Back</h2>
          <p className="leading-relaxed text-white">
            If you need to speak to us about a general query, fill in <br />
            the form below and we will call you back within the <br />
            same working day.
          </p>
        </div>

        {/* Right Form */}
        {/* <div className="bg-[#1F262A] p-8 rounded-xl shadow-lg"> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              How can we help? *
            </label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="border-gray-500 w-full rounded-lg border bg-transparent px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {topics.map((t, idx) => (
                <option key={idx} value={t} className="text-black">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name: *"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-500 placeholder-gray-400 w-full rounded-lg border bg-transparent px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number: *"
              value={formData.phone}
              onChange={handleChange}
              className="border-gray-500 placeholder-gray-400 w-full rounded-lg border bg-transparent px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#00ABC9] py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      {/* </div> */}
    </section>
  );
};

export default GetCallBack;
