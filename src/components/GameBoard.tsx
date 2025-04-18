
import { motion } from "framer-motion";

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
}

export const GameBoard = ({ guesses, currentGuess, solution }: GameBoardProps) => {
  const empties = Array(6 - (guesses.length + 1)).fill('');
  
  return (
    <div className="grid grid-rows-6 gap-1 mx-auto mb-8">
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

const Row = ({ guess, solution }: { guess: string; solution: string }) => {
  const tiles = guess.split('').map((letter, i) => {
    let className = "border-2 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded ";
    
    if (letter === solution[i]) {
      className += "bg-green-500 border-green-500 text-white";
    } else if (solution.includes(letter)) {
      className += "bg-yellow-500 border-yellow-500 text-white";
    } else {
      className += "bg-gray-500 border-gray-500 text-white";
    }
    
    return (
      <motion.div
        key={i}
        className={className}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 360 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        {letter}
      </motion.div>
    );
  });

  return (
    <div className="grid grid-cols-5 gap-1">
      {tiles}
    </div>
  );
};

const CurrentRow = ({ guess }: { guess: string }) => {
  const tiles = Array(5).fill('').map((_, i) => (
    <div
      key={i}
      className="border-2 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded"
    >
      {guess[i] || ''}
    </div>
  ));

  return (
    <div className="grid grid-cols-5 gap-1">
      {tiles}
    </div>
  );
};

const EmptyRow = () => {
  const tiles = Array(5).fill('').map((_, i) => (
    <div
      key={i}
      className="border-2 w-14 h-14 flex items-center justify-center text-2xl font-bold rounded"
    />
  ));

  return (
    <div className="grid grid-cols-5 gap-1">
      {tiles}
    </div>
  );
};
