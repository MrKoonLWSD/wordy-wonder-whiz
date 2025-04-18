
import { useState, useEffect } from "react";
import { GameBoard } from "@/components/GameBoard";
import { Keyboard } from "@/components/Keyboard";
import { getRandomWord, isValidWord } from "@/lib/words";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const [solution] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const usedLetters = guesses.reduce((acc: Record<string, 'correct' | 'present' | 'absent'>, guess) => {
    guess.split('').forEach((letter, i) => {
      if (letter === solution[i]) {
        acc[letter] = 'correct';
      } else if (solution.includes(letter) && acc[letter] !== 'correct') {
        acc[letter] = 'present';
      } else if (!solution.includes(letter)) {
        acc[letter] = 'absent';
      }
    });
    return acc;
  }, {});

  const onKey = (key: string) => {
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        toast({
          description: "Word must be 5 letters long",
          variant: "destructive",
        });
        return;
      }
      
      if (!isValidWord(currentGuess)) {
        toast({
          description: "Not in word list",
          variant: "destructive",
        });
        return;
      }

      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess.toUpperCase() === solution) {
        toast({
          description: "Congratulations! You won! 🎉",
        });
        setGameOver(true);
      } else if (newGuesses.length === 6) {
        toast({
          description: `Game Over! The word was ${solution}`,
          variant: "destructive",
        });
        setGameOver(true);
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onKey('Enter');
      } else if (e.key === 'Backspace') {
        onKey('⌫');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        onKey(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12">
      <h1 className="text-4xl font-bold mb-8">Word Guess</h1>
      <GameBoard 
        guesses={guesses} 
        currentGuess={currentGuess} 
        solution={solution} 
      />
      <Keyboard 
        onKeyPress={onKey}
        usedLetters={usedLetters}
      />
    </div>
  );
}
