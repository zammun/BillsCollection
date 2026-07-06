import React from 'react';

const ContactPage = () => {
  return (
    <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12'>
      <h1 className='text-3xl font-semibold mb-8'>Contact Us</h1>
      
      <div className='flex flex-col md:flex-row gap-16'>
        {/* Left: Contact Info */}
        <div className='w-full md:w-1/3 flex flex-col gap-8'>
          <p className='text-gray-500'>
            Have a question or want to get in touch? Fill out the form or contact us directly using the details below.
          </p>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-lg'>Address</span>
            <span className='text-gray-500'>365 Carteret Avenue<br/>Carteret, New Jersey, USA</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-lg'>Email</span>
            <span className='text-gray-500'>contact@billscollection.co</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-lg'>Phone</span>
            <span className='text-gray-500'>+1 (347) 327-6851</span>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className='w-full md:w-2/3'>
          <form className='flex flex-col gap-6'>
            <div className='flex flex-col md:flex-row gap-6'>
              <input 
                type='text' 
                placeholder='First Name' 
                className='p-4 w-full ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400' 
              />
              <input 
                type='text' 
                placeholder='Last Name' 
                className='p-4 w-full ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400' 
              />
            </div>
            <input 
              type='email' 
              placeholder='Email Address' 
              className='p-4 w-full ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400' 
            />
            <textarea 
              rows={6} 
              placeholder='Your Message' 
              className='p-4 w-full ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400'
            ></textarea>
            <button className='w-full md:w-max px-8 py-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors'>
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;