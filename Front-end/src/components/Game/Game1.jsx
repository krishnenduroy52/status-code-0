import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game1.css";
import Navbar from "../Navbar/Navbar";

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

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((state) => state + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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

  return (
    <div className="gradient-bg-welcome">
      <div>
        <Navbar />
        <div className="game1_info">
          <div className="game1_info_title">
            Click on 'b' out of other characture
          </div>

          <div className="game1_info_score">
            <div>
              <span>Correct</span>
              <span class="score1">{hits}</span>
            </div>
            <div>
              <span>Miss</span>
              <span class="score1">{hits}</span>
            </div>
            <div>
              <span>Accuracy</span>
              <span class="score1">{hits}</span>
            </div>
            <div>
              <span>Time</span>
              <span class="score1">{timer}</span>
            </div>
          </div>
        </div>
        {timer > 15 && navigate("/child/game2")}
        <div class="grid1">
          {letter &&
            letter.map((item, index) => (
              <div class="box1" onClick={() => handleClick(index)}>
                <h1>{letter[index]}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game1;
