import { useState, useEffect } from 'react';
import { Header, Footer } from '../../components';
import './main.css';

const Main = () => {
  const [message, setMessage] = useState('Welcome to Club Explore :)');

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('http://localhost:8080/');
        const data = await res.json();

        setMessage(data.message);
      } catch (e) {
        console.log(e);
      }
    }

    init();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h2>Club Explore Main Page</h2>
        <h3>{message}</h3>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
