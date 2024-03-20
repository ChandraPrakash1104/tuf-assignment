import { useNavigate } from 'react-router-dom';

const DataRow = ({ username, stdin, preferredLanguage, code, time, id }) => {
  const navigate = useNavigate();

  return (
    <tr
      className='border-b-4 border-slate-200  hover:bg-slate-100 transition-all'
      onClick={() => {
        navigate(`/submission/${id}`);
      }}
    >
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
      >
        {username}
      </th>
      <td className='px-6 py-4'>{preferredLanguage}</td>
      <td className='px-6 py-4'>{stdin}</td>
      <td className='px-6 py-4 max-w-xs overflow-auto whitespace-pre-wrap'>
        {code}
      </td>
      <td className='px-6 py-4'>{time}</td>
    </tr>
  );
};

export default DataRow;
