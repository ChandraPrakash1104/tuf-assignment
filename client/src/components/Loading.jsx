const Loading = () => {
  return (
    <div className='flex gap-2'>
      <div className='w-3 h-3 rounded-full animate-pulse bg-slate-600'></div>
      <div className='w-3 h-3 rounded-full animate-pulse bg-slate-600'></div>
      <div className='w-3 h-3 rounded-full animate-pulse bg-slate-600'></div>
    </div>
  );
};

export default Loading;
