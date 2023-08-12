import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game2.css";
import Navbar from "../Navbar/Navbar";

const Game2 = () => {
  const navigate = useNavigate();
  const charArray = ["q", "d", "p", "b"];
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

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((state) => state + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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

  return (
    <div className="gradient-bg-welcome">
      <div className="">
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
        {/* {timer > 15 && navigate("/child/game3 ")} */}
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

export default Game2;
