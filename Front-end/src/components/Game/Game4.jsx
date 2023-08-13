import React, { useEffect, useState } from 'react';
import './game4.css';

const wordsList = [
    { correct: 'this', incorrect: 'tish' },
    { correct: 'bed', incorrect: 'deb' },
    { correct: 'cat', incorrect: 'tac' },
    { correct: 'dog', incorrect: 'god' },
    { correct: 'car', incorrect: 'rac' },
    { correct: 'pen', incorrect: 'nep' }
];

const Game4 = () => {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [missed, setMissed] = useState(0);
    const [currentPair, setCurrentPair] = useState(wordsList[0]);
    const [isStart, setStart] = useState(false);
    const [timer, setTimer] = useState(0);


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

    const handleOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        } else {
            setMissed(missed + 1);
        }

        if (round < 6) {
            setRound(round + 1);
            setCurrentPair(wordsList[round]);
        } else {
            return (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <p>Correct Score: {score}</p>
                    <p>Missed Score: {missed}</p>
                    <p>Accuracy: {accuracy}%</p>
                </div>
            );
        }
    };

    const accuracy = (score === 0 && missed === 0) ? 0 : ((score / (score + missed)) * 100).toFixed(2);


    return (
        <div className="game-container gradient-bg-welcome">
            <h1>Word Game</h1>
            <h5>Choose the correct word below 👇</h5>
            {round < 6 ? (
                <>
                    <div className="game1_info_score game4_info">
                        <div className="flex flex-col">
                            <div className="score_card">
                                <span>Correct: &nbsp;</span>
                                <span class="score1">{score}</span>
                            </div>
                            <div className="score_card">
                                <span>Miss: &nbsp;</span>
                                <span class="score1">{missed}</span>
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
                    <div className="word-options">
                        <button className="action_btn game4_btn" onClick={() => handleOptionClick(true)}>{currentPair.correct}</button>
                        <button className='action_btn' onClick={() => handleOptionClick(false)}>{currentPair.incorrect}</button>
                    </div>
                </>
            ) : (
                <div className="game4-over">
                    <h2>Game Over</h2>
                    <p>Correct Score: {score}</p>
                    <p>Missed Score: {missed}</p>
                    <p>Accuracy: {accuracy}%</p>
                </div>
            )}
        </div>
    );
};

export default Game4;
