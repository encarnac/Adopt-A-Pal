import { useState, useEffect } from 'react';

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

        console.log("GetpalbyId:");
        console.log(jsonData);

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

  console.log("GetpalbyId:");
  console.log(data);

  return { loading, data, error };
}

export default UseGetPalById;