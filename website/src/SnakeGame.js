import React, { useState, useEffect, useRef } from 'react';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [[8, 8], [8, 7], [8, 6]];

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState([Math.floor(Math.random()*BOARD_SIZE), Math.floor(Math.random()*BOARD_SIZE)]);
  const [gameOver, setGameOver] = useState(false);
  const moveRef = useRef(direction);

  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowUp': if(moveRef.current!=='DOWN') setDirection('UP'); break;
        case 'ArrowDown': if(moveRef.current!=='UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if(moveRef.current!=='RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if(moveRef.current!=='LEFT') setDirection('RIGHT'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if(gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = [...prev[0]];
        if(moveRef.current==='UP') head[1] -= 1;
        if(moveRef.current==='DOWN') head[1] += 1;
        if(moveRef.current==='LEFT') head[0] -= 1;
        if(moveRef.current==='RIGHT') head[0] += 1;

        // Collision mur
        if(head[0]<0 || head[1]<0 || head[0]>=BOARD_SIZE || head[1]>=BOARD_SIZE) {
          setGameOver(true);
          return prev;
        }

        // Collision avec soi-même
        for(let segment of prev) {
          if(segment[0]===head[0] && segment[1]===head[1]){
            setGameOver(true);
            return prev;
          }
        }

        const newSnake = [head, ...prev];

        // Manger la nourriture
        if(head[0] === food[0] && head[1] === food[1]){
          setFood([Math.floor(Math.random()*BOARD_SIZE), Math.floor(Math.random()*BOARD_SIZE)]);
          return newSnake;
        } else {
          newSnake.pop();
          return newSnake;
        }
      });
    }, 200);
    return () => clearInterval(interval);
  }, [food, gameOver]);

  const renderCell = (x, y) => {
    for(let segment of snake){
      if(segment[0]===x && segment[1]===y) return <div key={`${x}-${y}`} style={{background:'green', width:'20px', height:'20px', border:'1px solid black'}}></div>;
    }
    if(food[0]===x && food[1]===y) return <div key={`${x}-${y}`} style={{background:'red', width:'20px', height:'20px', border:'1px solid black'}}></div>;
    return <div key={`${x}-${y}`} style={{width:'20px', height:'20px', border:'1px solid #ccc'}}></div>;
  };

  return (
    <div style={{textAlign:'center'}}>
      <h2>Hidden Snake 🐍</h2>
      {gameOver && <h3>Game Over ! Appuyez sur F5 pour recommencer</h3>}
      <div style={{display:'grid', gridTemplateColumns:`repeat(${BOARD_SIZE}, 20px)`, margin:'20px auto'}}>
        {Array.from({length: BOARD_SIZE}).map((_, y) =>
          Array.from({length: BOARD_SIZE}).map((_, x) => renderCell(x, y))
        )}
      </div>
      <p>Contrôlez avec les flèches du clavier !</p>
    </div>
  );
}
