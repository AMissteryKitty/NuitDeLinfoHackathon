import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import Scenario from './Scenario';
import InfoScreen from './InfoScreen';
import SnakeGame from './SnakeGame';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [snakeActive, setSnakeActive] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');

  const navigate = (name) => setScreen(name);

  useEffect(() => {
    const handleKey = (e) => {
      setKeyBuffer(prev => {
        const next = (prev + e.key).slice(-5); // garder les 5 derniers caractères
        if(next.toLowerCase() === 'snake') setSnakeActive(true);
        return next;
      });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if(snakeActive) return <SnakeGame />;

  return (
    <div>
      {screen === 'home' && <HomeScreen navigate={navigate} />}
      {screen === 'scenario' && <Scenario navigate={navigate} />}
      {screen === 'info' && <InfoScreen navigate={navigate} />}
    </div>
  );
}
