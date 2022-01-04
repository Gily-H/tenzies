import React from "react";
import "../styles/dice.css";

export default function Die({ value, onHold, clickHandle }) {
  return (
    <button className={onHold ? "die held" : "die"} onClick={clickHandle}>
      {value}
    </button>
  );
}
