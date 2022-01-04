import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
import "./styles/app.css";

export default function App() {
  const [diceValues, setDiceValues] = useState(() => getDiceValues());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let allHeld = diceValues.every((die) => die.onHold);
    const dieValue = diceValues[0].value;
    let allEqual = diceValues.every((die) => die.value === dieValue);

    if (allHeld && allEqual) {
      setTenzies(true);
      console.log("winner");
    }
  }, [diceValues]);

  function getDiceValues() {
    const values = [];
    for (let i = 1; i <= 10; i++) {
      const value = Math.ceil(Math.random() * 6);
      const die = {
        id: i,
        value: value,
        onHold: false,
      };

      values.push(die);
    }

    return values;
  }

  function rollOnCLick() {
    setDiceValues((oldDiceValues) =>
      oldDiceValues.map((oldDie) => {
        return oldDie.onHold ? oldDie : { ...oldDie, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  function onHoldClick(dieId) {
    setDiceValues((oldDiceValues) =>
      oldDiceValues.map((oldDie) => {
        return oldDie.id === dieId ? { ...oldDie, onHold: !oldDie.onHold } : oldDie;
      })
    );
  }

  function playAgain() {
    setDiceValues(getDiceValues());
    setTenzies(false);
  }

  const dice = diceValues.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        onHold={die.onHold}
        clickHandle={() => onHoldClick(die.id)}
      />
    );
  });

  return (
    <main className="game-board">
      {tenzies && <Confetti className="confetti" />}
      <h1 className="game-title">Tenzies</h1>
      <p className="game-description">
        Roll until all dice are the same. Click each die to freeze it at its current value between
        rolls
      </p>
      <div className="dice-container">{dice}</div>
      <button className="roll-btn" onClick={tenzies ? playAgain : rollOnCLick}>
        {tenzies ? "Play Again!" : "Roll"}
      </button>
    </main>
  );
}
