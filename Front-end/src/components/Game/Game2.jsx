import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game2.css";

const Game2 = () => {
  const navigate = useNavigate();
  const [hits, setHits] = useState(0);
  const [letter, setLetter] = useState([
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "F",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
  ]);
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);
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

  const updateValues = (index) => {
    if (letter[index] == "F") {
      setHits(hits + 1);
    } else {
      setMisses(misses + 1);
    }
    setClicks(clicks + 1);
  };

  const getRandomIndex = () => {
    const indexValue = Math.floor(Math.random() * 25);
    let arr = letter;
    arr[letter.indexOf("F")] = "E";
    arr[indexValue] = "F";
    return arr;
  };

  const handleClick = (index) => {
    updateValues(index);

    const randomIndex = getRandomIndex();
    setLetter(randomIndex);
  };

  const accuracy = clicks === 0 ? 0 : ((hits / clicks) * 100).toFixed(2);

  return (
    <div className="gradient-bg-welcome">
      <div className="">
        <div className="game1_info">
          <div className="game1_info_title">
            <h1>Click on 'F' out of other character</h1>
          </div>

          <div className="game1_info_score">
            <div className="flex flex-col">
              <div className="score_card">
                <span>Correct: &nbsp;</span>
                <span class="score1">{hits}</span>
              </div>
              <div className="score_card">
                <span>Miss: &nbsp;</span>
                <span class="score1">{misses}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="score_card">
                <span>Accuracy: &nbsp;</span>
                <span class="score1">{accuracy}%</span>
              </div>
              <div className="score_card">
                <span>Timer: &nbsp;</span>
                <span class="score1">{timer}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Start button */}
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
          // Render the grid if isStart is true
          <div class="grid1">
            {timer > 25 && navigate("/child/game3")}
            {letter &&
              letter.map((item, index) => (
                <div class="box1" onClick={() => handleClick(index)}>
                  <h1 style={{marginBottom: '6rem'}}>{letter[index]}</h1>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game2;
