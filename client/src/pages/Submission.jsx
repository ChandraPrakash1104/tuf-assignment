import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchSubmission from '../hooks/useFetchSubmission';
import AppBar from '../components/AppBar';
import RunSubmissionCode from '../components/RunSubmissionCode';

const Submission = () => {
  const params = useParams();
  const { data, isLoading } = useFetchSubmission(params.id);
  if (isLoading) {
    return <div>loading...</div>;
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
              <div>{data.preferred_language}</div>
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
            <RunSubmissionCode
              sourceCode={data.source_code}
              stdin={data.stdin}
              lang={data.preferred_language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
