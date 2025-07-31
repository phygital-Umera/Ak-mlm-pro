import React from 'react';
import Footer from './Footer';
import Header from '../HomePage/Header';

const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="dark:bg-gray-900 text-gray-800 bg-gray-50 flex min-h-screen flex-col justify-between dark:text-white">
        <div className="mt-20 flex flex-grow items-center justify-center px-4">
          <div className="dark:bg-gray-800 bg-gray-50 w-full max-w-xl rounded-lg p-8">
            <h2 className="mb-5 text-center text-3xl font-bold text-black dark:text-white">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              We&apos;d love to hear from you! Fill out the form below and our
              team will get back to you soon.
            </p>
            <form className="space-y-5">
              <div>
                <label className="mb-1 block font-medium">Full Name</label>
                <input
                  type="text"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-700 w-full rounded-md border px-4 py-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">Email Address</label>
                <input
                  type="email"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-700 w-full rounded-md border px-4 py-2"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">Message</label>
                <textarea
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-700 w-full rounded-md border px-4 py-2"
                  rows="5"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
