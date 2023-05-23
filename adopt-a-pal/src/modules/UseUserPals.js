import React, { useState, useEffect, useCallback } from 'react';
// import useGetPalById from './UseGetPalById';

function UseUserPals( url ) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  // console.log("userpal url:");
  // console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();

        const { firstname, lastname, pals, email } = jsonData;
        const filteredData = {
          firstname,
          lastname,
          pals,
          email,
        };

        setData(filteredData);
        // callback(pals);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    data
  );
}

export default UseUserPals;