import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        const data = response.data.data;
        if (response.status !== 200) {
          throw new Error('Failed to fetch code');
        }
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useDataFetcher;
