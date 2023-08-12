import React, { useState, useEffect } from "react";
import "./game3.css";

const words = ["apple", "banana", "cherry", "grape", "orange"];
const maxAttempts = 6;

const Game3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumbledWord, setJumbledWord] = useState(
    jumbleWord(words[currentIndex])
  );
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [correctScore, setCorrectScore] = useState(0);
  const [missScore, setMissScore] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((state) => state + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function jumbleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  function checkAnswer() {
    if (inputValue.toLowerCase() === words[currentIndex]) {
      setIsCorrect(true);
      setIsWrong(false);
      setCorrectScore(correctScore + 1);
    } else {
      setIsCorrect(false);
      setIsWrong(true);
      setMissScore(missScore + 1);
    }
  }

  function nextWord() {
    if (attempts < maxAttempts - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setInputValue("");
      setIsCorrect(false);
      setIsWrong(false);
      setAttempts(attempts + 1);
    }
  }

  useEffect(() => {
    if (attempts === maxAttempts - 1) {
      setEndTime(Date.now());
    } else {
      setJumbledWord(jumbleWord(words[currentIndex]));
      setStartTime(Date.now());
    }
  }, [currentIndex, attempts]);

  useEffect(() => {
    if (attempts === maxAttempts - 1) {
      const timeElapsed = endTime - startTime;
      const accuracy = (correctScore / (correctScore + missScore)) * 100 || 0;
      setAccuracyScore(accuracy.toFixed(2));
    }
  }, [correctScore, missScore, attempts, endTime, startTime]);

  const calAccuracy = () => {
    return (correctScore / (correctScore + missScore)) * 100 || 0;
  };

  return (
    <div className="Game3">
      <div className="game1_info">
        <div className="game1_info_title">
          <p>Jumbled Words Game</p>
          <p>Unscramble the word below:</p>
        </div>

        <div className="game1_info_score">
          <div>
            <span>Correct</span>
            <span className="score1">{correctScore}</span>
          </div>
          <div>
            <span>Miss</span>
            <span className="score1">{missScore}</span>
          </div>
          <div>
            <span>Accuracy</span>
            <span className="score1">{calAccuracy()}</span>
          </div>
          <div>
            <span>Time</span>
            <span className="score1">{timer}</span>
          </div>
        </div>
      </div>
      {/* {timer > 25 && navigate("/child/game2")} */}
      <div className="word-box">
        {isCorrect && <div className="correct-answer">Correct!</div>}
        {isWrong && (
          <div className="wrong-answer">
            Wrong! The correct answer is: {words[currentIndex]}
            {accuracyScore}%
          </div>
        )}
        {!isCorrect && !isWrong && (
          <div className="jumbled-word">{jumbledWord}</div>
        )}
      </div>
      {!isCorrect && !isWrong && attempts < maxAttempts - 1 && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={checkAnswer}>Check</button>
        </>
      )}
      {(isCorrect || isWrong) && attempts < maxAttempts - 1 && (
        <button onClick={nextWord}>Next Word</button>
      )}
    </div>
  );
};

export default Game3;
