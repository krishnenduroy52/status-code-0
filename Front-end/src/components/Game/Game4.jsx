import React, { useState } from 'react';
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

    const accuracy = ((score / (score + missed)) * 100).toFixed(2);

    return (
        <div className="game-container">
            <h1>Word Game</h1>
            {round < 6 ? (
                <>
                    <p>Round: {round}</p>
                    <p>Score: {score}</p>
                    <div className="word-options">
                        <button onClick={() => handleOptionClick(true)}>{currentPair.correct}</button>
                        <button onClick={() => handleOptionClick(false)}>{currentPair.incorrect}</button>
                    </div>
                </>
            ) : (
                <div className="game-over">
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
