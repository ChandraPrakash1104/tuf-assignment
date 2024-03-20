import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSubmission = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${id}`
        );
        const data = response.data.data;
        if (response.status !== 200) {
          throw new Error('Failed to fetch code');
        }
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, isLoading, error };
};

export default useFetchSubmission;
