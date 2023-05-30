import React, { useState, useEffect } from 'react';

function UseGetPalById(palId) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const palUrl = `/api/animals/${palId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(palUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        const {
          name,
          added,
          availability,
          avatars,
          breed,
          dispositions,
        } = jsonData;

        const filteredData = {
          name,
          added,
          availability,
          avatars,
          breed,
          dispositions,
        };

        setData(filteredData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [palUrl, token]);

  if (loading) {
    return <div>Loading pal data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  return data;
}

export default UseGetPalById;