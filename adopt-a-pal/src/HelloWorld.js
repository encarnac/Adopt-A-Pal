import React, { useState, useEffect } from 'react';

function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error));
  }, []);

  return <div>{message}</div>;
}

export default HelloWorld;