import useCodeOutput from '../hooks/useCodeOutput';
import Loading from './Loading';

const RunSubmissionCode = ({ sourceCode, stdin, lang }) => {
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
    <div className='min-h-16'>
      <div className='flex justify-between'>
        <div className='font-semibold'>Output</div>
        <button
          className='bg-gray-800 text-gray-50 px-4 py-1 rounded-lg hover:bg-gray-900 transition-all font-semibold cursor-pointer text-sm'
          type='submit'
        >
          Run
        </button>
      </div>
      {isLoading && (
        <div className='flex justify-center'>
          <Loading />
        </div>
      )}
      <div className='flex bg-slate-100 p-8 text-sm'>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default RunSubmissionCode;
