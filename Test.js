import React, { useState, useEffect, useRef } from 'react';

function Test() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25); // Pomodoro-style 25-minute timer
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>TIMER</h2>
      <h3>{String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}</h3>
      <div>
        <button onClick={startTimer} style={{ margin: '5px', backgroundColor: 'lightgreen' }}>START</button>
        <button onClick={stopTimer} style={{ margin: '5px', backgroundColor: 'red', color: 'white' }}>STOP</button>
        <button onClick={resetTimer} style={{ margin: '5px', backgroundColor: 'lightblue' }}>RESET</button>
      </div>
    </div>
  );
}

export default Test;
