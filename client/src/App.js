import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch("/test")
      .then(res => res.text()) // Assuming the response is text
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}

export default App;
