import React, { useState, useEffect } from 'react';

function UseUserPals( url ) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display the JSON data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
  
  export default UseUserPals;