import React, { useState, useEffect } from 'react';

function UseUserPals(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  console.log(url.url);
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();

        // Extract only the required properties from the JSON data
        const { firstname, lastname, pals, email } = jsonData;
        const filteredData = {
          firstname,
          lastname,
          pals,
          email,
        };

        setData(filteredData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url.url, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display the filtered JSON data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default UseUserPals;