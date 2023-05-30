import React, { useState, useEffect } from 'react';
import UseGetPalById from './UseGetPalById';

function UseFetchPalData(pals) {
    const [palDataList, setPalDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const promises = pals.map((palId) => UseGetPalById(palId));
          const palDataList = await Promise.all(promises);
          setPalDataList(palDataList);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching pal data:', error);
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [pals]);
  
    return { loading, palDataList, error };
}

export default UseFetchPalData;