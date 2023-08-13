import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game1.css";

const Game1 = () => {
  const navigate = useNavigate();
  const charArray = ["q", "d", "p", "b"];
  const [letter, setLetter] = useState([
    "q",
    "b",
    "p",
    "q",
    "p",
    "b",
    "d",
    "d",
    "p",
    "q",
    "b",
    "d",
    "p",
    "q",
    "d",
    "p",
    "q",
    "b",
    "q",
    "p",
    "b",
    "d",
    "d",
    "p",
    "q",
  ]);
  const [timer, setTimer] = useState(0);
  const [hits, setHits] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);
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
    console.log(letter[index]);
    if (letter[index] == "b") {
      setHits(hits + 1);
    } else {
      setMisses(misses + 1);
    }
    setClicks(clicks + 1);
  };

  const getRandomChar = () => {
    let arr = new Array(25);
    for (let i = 0; i < letter.length; i++) {
      arr[i] = charArray[Math.floor(Math.random() * charArray.length)];
    }
    return arr;
  };

  const handleClick = (index) => {
    updateValues(index);

    const randomChar = getRandomChar();
    setLetter(randomChar);
  };

  const accuracy = clicks === 0 ? 0 : ((hits / clicks) * 100).toFixed(2);

  return (
    <div className="gradient-bg-welcome">
      <div>
        <div className="game1_info">
          <div className="game1_info_title">
            <h1>Click on 'b' out of other character</h1>
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
            {timer > 25 && navigate("/child/game2")}
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

export default Game1;
