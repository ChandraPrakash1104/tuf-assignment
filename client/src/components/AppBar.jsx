import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <div className='h-16 bg-white flex items-center px-8 justify-center'>
      <div className='w-full md:w-3/4 xl:w-1/2 flex justify-end'>
        <Link
          to='/submission'
          className='bg-gray-800 text-gray-50 px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold cursor-pointer'
          type='submit'
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
