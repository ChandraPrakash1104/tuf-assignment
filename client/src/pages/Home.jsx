import AppBar from '../components/AppBar';
import DataTable from '../components/DataTable';

const Home = () => {
  return (
    <div className='bg-slate-200 space-y-6 min-h-screen '>
      <AppBar />
      <DataTable />
    </div>
  );
};

export default Home;
