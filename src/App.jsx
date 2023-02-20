import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

const App = () => {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="text-[40px] m-0">Tenzies</h1>
      <p className="font-normal text-center mt-0">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid grid-cols-5 gap-5 mb-10">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button
        className="h-[50px] w-[150px] bg-[#5035ff] text-[white] text-[1.2rem] cursor-pointer rounded-md border-[none] active:shadow-[inset_5px_5px_10px_-3px_rgba(0,0,0,0.7)]"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
