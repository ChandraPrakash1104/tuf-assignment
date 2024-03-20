import { useState, useEffect } from 'react';
import axios from 'axios';

const useCodeOutput = (sourceCode, stdin, langCode) => {
  console.log(langCode);
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  const base64EncodedCode = btoa(sourceCode);
  const base64EncodedStdin = btoa(stdin);
  const postSubmission = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      fields: '*',
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
      'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host,
    },
    data: {
      language_id: 54,
      source_code: base64EncodedCode,
      stdin: base64EncodedStdin,
    },
  };
  const getSubmission = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: 'true',
      fields: '*',
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
      'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.request(postSubmission);
        setToken(response.data.token);

        const output = await axios.request(getSubmission);
        console.log(output);
        setOutput(atob(output.data.stdout));
        setStatus(output.status);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { output, status, isLoading, error };
};

export default useCodeOutput;
