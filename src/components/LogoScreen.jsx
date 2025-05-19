import React, { useEffect } from 'react';
import logo from '../assets/logo.png';

const LogoScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <img src={logo} alt="Loc8Now Logo" style={{ width: '200px' }} />
      <h1>Loc8Now</h1>
      <p>Find Fast, Never Last!</p>
    </div>
  );
};

export default LogoScreen;
