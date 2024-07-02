import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [initialTime, setInitialTime] = useState(60000); // Tiempo inicial en milisegundos
  const [time, setTime] = useState(60000); // Tiempo en milisegundos
  const [pointsRed, setPointsRed] = useState(0);
  const [pointsBlue, setPointsBlue] = useState(0);
  const [faultsRed, setFaultsRed] = useState(0);
  const [faultsBlue, setFaultsBlue] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (intervalId) {
      const id = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 10 : 0));
      }, 10);
      return () => clearInterval(id);
    }
  }, [intervalId]);

  const setTimer = (duration) => {
    setInitialTime(duration * 1000);
    setTime(duration * 1000);
    setIntervalId(null);
  };

  const startTimer = () => {
    if (time > 0) {
      setIntervalId(true);
    }
  };

  const stopTimer = () => {
    setIntervalId(null);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIntervalId(null);
  };

  const addPoints = (team, points) => {
    if (team === 'red') setPointsRed(pointsRed + points);
    else setPointsBlue(pointsBlue + points);
  };

  const addFault = (team) => {
    if (team === 'red') {
      const newFaultsRed = faultsRed + 1;
      setFaultsRed(newFaultsRed);
      if (newFaultsRed >= 3) setPointsRed(pointsRed - 1);
    } else {
      const newFaultsBlue = faultsBlue + 1;
      setFaultsBlue(newFaultsBlue);
      if (newFaultsBlue >= 3) setPointsBlue(pointsBlue - 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Karate Score Counter</h1>
        <div className="timer-controls">
          <button className="timer-button" onClick={() => setTimer(60)}>1:00</button>
          <button className="timer-button" onClick={() => setTimer(90)}>1:30</button>
          <button className="timer-button" onClick={() => setTimer(120)}>2:00</button>
          <button className="timer-button" onClick={startTimer}>Start</button>
          <button className="timer-button" onClick={stopTimer}>Stop</button>
          <button className="timer-button" onClick={resetTimer}>Reset</button>
        </div>
        <div className="timer">
          <span>
            {Math.floor(time / 60000)}:
            {Math.floor((time % 60000) / 1000).toString().padStart(2, '0')}:
            {Math.floor((time % 1000) / 10).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="score-container">
          <div className="team red">
            <h2>Red: {pointsRed}</h2>
            <div className="faults">
              {[...Array(faultsRed)].map((_, index) => (
                <span key={index} className="fault">X</span>
              ))}
            </div>
            <button className="point-button red-button" onClick={() => addPoints('red', 1)}>+1</button>
            <button className="point-button red-button" onClick={() => addPoints('red', 2)}>+2</button>
            <button className="point-button red-button" onClick={() => addPoints('red', 3)}>+3</button>
            <button className="fault-button red-button" onClick={() => addFault('red')}>Add Fault</button>
          </div>
          <div className="team blue">
            <h2>Blue: {pointsBlue}</h2>
            <div className="faults">
              {[...Array(faultsBlue)].map((_, index) => (
                <span key={index} className="fault">X</span>
              ))}
            </div>
            <button className="point-button blue-button" onClick={() => addPoints('blue', 1)}>+1</button>
            <button className="point-button blue-button" onClick={() => addPoints('blue', 2)}>+2</button>
            <button className="point-button blue-button" onClick={() => addPoints('blue', 3)}>+3</button>
            <button className="fault-button blue-button" onClick={() => addFault('blue')}>Add Fault</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
