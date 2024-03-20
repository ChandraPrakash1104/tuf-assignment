import { useState } from 'react';
import useCodeOutput from '../hooks/useCodeOutput';
import Loading from './Loading';

const RunSubmittedCode = ({ sourceCode, stdin, lang }) => {
  const [showOutput, setShowOutput] = useState(false);
  const langToLangCode = new Map([
    ['c++', 54],
    ['java', 62],
    ['javascript', 63],
    ['python', 70],
  ]);

  const { output, status, isLoading, error } = useCodeOutput(
    sourceCode,
    stdin,
    langToLangCode.get(lang.toLowerCase())
  );

  console.log(output);
  console.log(status);
  console.log(error);

  return (
    <div className='min-h-16 bg-slate-100 '>
      {isLoading && (
        <div className='flex justify-center'>
          <Loading />
        </div>
      )}
      {showOutput && (
        <div className='flex p-8 text-sm'>
          <pre>output</pre>
        </div>
      )}
    </div>
  );
};

export default RunSubmittedCode;
