
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: {
    [key: string]: 'correct' | 'present' | 'absent' | undefined;
  };
}

export const Keyboard = ({ onKeyPress, usedLetters }: KeyboardProps) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const getKeyClass = (key: string) => {
    const status = usedLetters[key];
    let className = "px-3 py-4 rounded text-sm font-bold mx-0.5 ";
    
    switch (status) {
      case 'correct':
        return className + "bg-green-500 text-white";
      case 'present':
        return className + "bg-yellow-500 text-white";
      case 'absent':
        return className + "bg-gray-500 text-white";
      default:
        return className + "bg-gray-200 hover:bg-gray-300";
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
