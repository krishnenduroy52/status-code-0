import React, { useState, useEffect } from "react";
import "./game3.css";

const words = ["apple", "banana", "cherry", "grape", "orange"];
const maxAttempts = words.length + 1;

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
  const [isStart, setStart] = useState(false);

  useEffect(() => {
    let timerId;
    if (isStart) {
      timerId = setInterval(() => {
        setTimer((state) => state + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isStart]);

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

  const isGameOver = attempts === maxAttempts - 1;

  return (
    <div className="Game3 gradient-bg-welcome">
      <div className="game1_info">
        <div className="game1_info_title">
          <h1>Jumbled Words Game</h1>
          <h5>Unscramble the word below:</h5>
        </div>

        <div className="game1_info_score">
          <div className="flex flex-col">
            <div className="score_card">
              <span>Correct: &nbsp;</span>
              <span class="score1">{correctScore}</span>
            </div>
            <div className="score_card">
              <span>Miss: &nbsp;</span>
              <span class="score1">{missScore}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="score_card">
              <span>Accuracy: &nbsp;</span>
              <span class="score1">{calAccuracy()}%</span>
            </div>
            <div className="score_card">
              <span>Timer: &nbsp;</span>
              <span class="score1">{timer}</span>
            </div>
          </div>
        </div>
      </div>
      {/* {timer > 25 && navigate("/child/game")} */}
      {!isStart ? (
        <div className="game1_start">
          <button
            className="game1_start_btn action_btn"
            onClick={() => {
              setStart(true);
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div>
          <div className="word-box">
            {isCorrect && <div className="correct-answer">Correct!</div>}
            {isWrong && (
              <div className="wrong-answer check_btn">
                Wrong! The correct answer is: {words[currentIndex]}
              </div>
            )}
            {!isCorrect && !isWrong && !isGameOver && (
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
              <br />
              <button className="action_btn check_btn" onClick={checkAnswer}>
                Check
              </button>
            </>
          )}
          {(isCorrect || isWrong) && attempts < maxAttempts - 1 && (
            <button onClick={nextWord} className="check_btn action_btn">
              Next Word
            </button>
          )}
        </div>
      )}
      {isGameOver && (
        <div className="game3-over">
          <h2>Game Over</h2>
        </div>
      )}
    </div>
  );
};

export default Game3;
