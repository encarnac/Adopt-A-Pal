import React, { useState, useEffect } from 'react';

function get_user_pals() {
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      fetch(`/api/users/${uid}`)
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error(error));
    }, []);
  
    return <div>{message}</div>;
  }
  
  export default get_user_pals;