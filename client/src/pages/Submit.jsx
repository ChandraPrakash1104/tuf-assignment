import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../api';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameIsChanged, setUsernameIsChanged] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionIsChanged, setSelectedOptionIsChanged] = useState(false);
  const [stdin, setStdin] = useState('');
  const [code, setCode] = useState('');
  const [codeIsChanged, setCodeIsChanged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (username.length >= 3 && selectedOption && code) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [username, selectedOption, code]);

  const submitHandler = async () => {
    const response = await axios.post(import.meta.env.VITE_API_URL, {
      username,
      preferred_language: selectedOption,
      stdin,
      source_code: code,
    });
    console.log(response);
    navigate('/');
  };

  const usernameIsValid = username.length >= 3;
  const optionIsValid =
    selectedOption === 'c++' ||
    selectedOption === 'java' ||
    selectedOption === 'javascript' ||
    selectedOption === 'python';

  const codeIsValid = code.length > 1;

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-200'>
      <div className='w-full md:w-3/4 space-y-6 xl:w-1/2 bg-white p-10 rounded-lg'>
        <div>
          <label
            htmlFor='username'
            className='block font-medium text-gray-900 '
          >
            Username
            <span className='text-red-500'> *</span>
          </label>
          <input
            type='text'
            id='username'
            className='block w-full p-3 text-gray-900 border outline-black border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameIsChanged(true);
            }}
          />
          {usernameIsChanged && !usernameIsValid && (
            <div className='text-sm text-red-500 font-thin'>
              Please Enter a username (min. length 3)
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor='countries'
            className='block mb-2 font-medium text-gray-900'
          >
            Select an option
            <span className='text-red-500'> *</span>
          </label>
          <select
            id='countries'
            className='bg-gray-50 border outline-black border-gray-300 text-gray-900 text rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setSelectedOptionIsChanged(true);
            }}
            value={selectedOption}
          >
            <option defaultValue>Choose a language </option>
            <option value='c++'>C++</option>
            <option value='java'>Java</option>
            <option value='javascript'>JavaScript</option>
            <option value='python'>Python</option>
          </select>
          {selectedOptionIsChanged && !optionIsValid && (
            <div className='text-sm text-red-500 font-thin'>
              Please choose an option
            </div>
          )}
        </div>
        <div>
          <label htmlFor='option' className='block font-medium text-gray-900 '>
            Standard input
          </label>
          <textarea
            type='text'
            id='option'
            className='block w-full h-26 p-3 outline-black text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 resize-none'
            value={stdin}
            placeholder='Enter standard input'
            onChange={(e) => {
              setStdin(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='sourcecode'
            className='block font-medium text-gray-900 '
          >
            Source code
            <span className='text-red-500'> *</span>
          </label>
          <textarea
            type='text'
            id='sourcecode'
            className='block w-full h-44 p-3 outline-black text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 resize-none'
            value={code}
            placeholder='Enter source code'
            onChange={(e) => {
              setCode(e.target.value);
              setCodeIsChanged(true);
            }}
          />
          {codeIsChanged && !codeIsValid && (
            <div className='text-sm text-red-500 font-thin'>
              Please enter or paste your source code
            </div>
          )}
        </div>
        <button
          className={`bg-gray-800 text-gray-50 px-6 py-2 rounded-lg hover:bg-gray-900 transition-all  ${
            !isFormValid && 'opacity-50 pointer-events-none'
          }`}
          onClick={submitHandler}
          type='submit'
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Submit;
