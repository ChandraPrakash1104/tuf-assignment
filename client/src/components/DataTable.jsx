import useDataFetcher from '../hooks/useDataFetcher';
import DataRow from './DataRow';
import Loading from './Loading';

const DataTable = () => {
  const { data, isLoading, error } = useDataFetcher();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    );
  }
  console.log(typeof data);
  return (
    <div className='flex justify-center'>
      <div className='bg-white overflow-auto w-full md:w-3/4 xl:w-1/2 '>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
          <thead className='text-gray-700 uppercase border-b-4'>
            <tr>
              <th scope='col' className='px-6 py-5'>
                Username
              </th>
              <th scope='col' className='px-6 py-5'>
                Language
              </th>
              <th scope='col' className='px-6 py-5'>
                Stdin
              </th>
              <th scope='col' className='px-6 py-5'>
                Code
              </th>
              <th scope='col' className='px-6 py-5'>
                Date / Time
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((row) => (
              <DataRow
                key={row.id}
                id={row.id}
                username={row.username}
                preferredLanguage={row.preferred_language}
                stdin={row.stdin}
                code={
                  row.source_code.length > 100
                    ? row.source_code.substring(0, 100)
                    : row.source_code
                }
                time={new Date(row.created_at).toLocaleString()}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
