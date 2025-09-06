import React, {useState} from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    sponsorCode: '',
    placement: '',
    fullName: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.terms) {
      alert('You must accept the Terms & Privacy Policy.');
      return;
    }
    alert('Member Registered Successfully ✅');
  };

  return (
    <div
      className="bg-gray-100 flex min-h-screen items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          'url(https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2023/06/nps.jpg)',
      }}
    >
      <div className="m-4 w-full max-w-2xl rounded-lg bg-[#F6F8FA] p-6 shadow-lg">
        {/* Title */}
        <div className="mb-6 border-b pb-4">
          <h2 className="relative inline-block text-2xl font-semibold text-[#333333]">
            Registration
            <span className="absolute bottom-0 left-0 mt-2 h-1 w-8 bg-gradient-to-r from-orange-400 to-red-500"></span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="font-medium">
                Sponsor Code<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sponsorCode"
                placeholder="Sponsor Code"
                value={formData.sponsorCode}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-medium">
                Placement<span className="text-red-500">*</span>
              </label>
              <select
                name="placement"
                value={formData.placement}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Placement</option>
                <option value="1">LEFT</option>
                <option value="2">RIGHT</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="font-medium">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-medium">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                maxLength={10}
                placeholder="Enter your number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="font-medium">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="font-medium">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-medium">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-gray-100 mt-1 w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="border-gray-300 h-4 w-4 rounded text-blue-600"
            />
            <p className="text-gray-600 text-sm">
              I accept the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Register button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-sky-400 to-sky-700 py-3 text-lg font-semibold text-white shadow transition hover:from-sky-700 hover:to-sky-400"
            >
              Register
            </button>
          </div>
        </form>

        {/* Bottom Links */}
        <div className="text-gray-600 mt-6 space-y-2 text-center">
          <p>
            Already have an Account?{' '}
            <a href="/Signin" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
          <p>
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// export default RegistrationForm;
