import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchSubmission from '../hooks/useFetchSubmission';
import AppBar from '../components/AppBar';
import RunSubmittedCode from '../components/RunSubmittedCode';
import Loading from '../components/Loading';

const Submission = () => {
  const params = useParams();
  const { data, isLoading } = useFetchSubmission(params.id);
  const [showOutput, setShowOutput] = useState(false);
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loading />
      </div>
    );
  }

  const lines = data?.source_code.split('\n');
  return (
    <div className='bg-slate-200 min-h-screen space-y-6'>
      <AppBar />
      <div className='w-full flex justify-center'>
        <div className='w-full md:w-3/4 xl:w-1/2 p-8 bg-white space-y-4'>
          <div className='font-semibold'>{data.username}</div>
          <div>
            <div className='flex justify-between'>
              <div className='font-semibold'>Code</div>
              <div>
                <span className='font-semibold'>Lang:</span>{' '}
                {data.preferred_language}
              </div>
              <div className='text-slate-500 text-sm'>
                {new Date(data.created_at).toLocaleString()}
              </div>
            </div>
            <div className='flex bg-slate-100 p-8 text-sm'>
              <div className='w-10 text-right pr-4'>
                {lines
                  .filter((line) => line.trim() !== '')
                  .map((_, index) => (
                    <div key={index} className='text-gray-400'>
                      {index + 1}
                    </div>
                  ))}
              </div>
              <div className=''>
                {lines
                  .filter((line) => line.trim() !== '')
                  .map((line, index) => (
                    <pre key={index} className='text-gray-900'>
                      {line}
                    </pre>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className='font-semibold'>Stdin</div>
            <div className='bg-slate-100 p-8 text-sm font-slate-800'>
              <pre>{data.stdin}</pre>
            </div>
          </div>
          <div>
            <div className='min-h-16'>
              <div className='flex justify-between'>
                <div className='font-semibold'>Output</div>
                <button
                  className='bg-gray-800 text-gray-50 px-4 py-1 rounded-lg hover:bg-gray-900 transition-all font-semibold cursor-pointer text-sm'
                  type='submit'
                  onClick={() => setShowOutput(true)}
                >
                  Run
                </button>
              </div>
            </div>
            {showOutput && (
              <RunSubmittedCode
                sourceCode={data.source_code}
                stdin={data.stdin}
                lang={data.preferred_language}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
