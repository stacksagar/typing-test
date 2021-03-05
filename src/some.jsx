import React, { useEffect, useRef, useState } from 'react';

const getCloud = () => 'Top 5 Programming languages'.split(' ');

function Word(props) {
  const rerender = useRef(0);
  const { text, active, correct } = props;
  useEffect(() => {
    rerender.current += 1;
  });
  if (correct === true) {
    return <span className="text-green-500 bg-gray-900"> {text} </span>;
  }
  if (correct === false) {
    return <del className="text-red-900 bg-gray-900"> {text} </del>;
  }
  if (active) {
    return <span className="text-indigo-200 text-3xl active"> {text} </span>;
  }
  return <span className="text-gray-400"> {text} </span>;
}


function Timer(props) {
  const { startCounting, correctWords } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => { 
    let counting;
    if (startCounting) {
      counting = setInterval(() => {
        setTimeElapsed((prevN) => prevN + 1);
      }, 1000);
    }

    return () => {
      clearInterval(counting);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <div>
      <p>Speed: {timeElapsed}</p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(2)} (WPM)</p> 
    </div>
  );
}

const App = () => {
  const cloud = useRef(getCloud());
  const [userInput, setUserInput] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  const [startCounting, setStartCounting] = useState(false);

  function processInput(value) {
    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(' ')) {
      setActiveWordIndex((index) => index + 1);
      setUserInput('');

      // correct word
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });

      if (activeWordIndex === cloud.current.length - 1) {
        setStartCounting(false);
        return;
      }
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="p-10 w-full rounded bg-gray-600 flex flex-col justify-center items-start">
      <h1 className="py-2 px-10 bg-gray-900 rounded-lg shadow">Typing Test</h1>
      <div className="mt-4">
        <Timer
          correctWords={correctWordArray.filter(Boolean).length}
          startCounting={startCounting}
        />
      </div>
      <div className="bg-gray-800 py-2 px-6 rounded shadow my-5 h-32 flex items-center">
        <p className="text-2xl">
          {cloud.current.map((word, index) => {
            return (
              <Word
                key={index}
                active={index === activeWordIndex}
                text={word}
                correct={correctWordArray[index]}
              />
            );
          })}
        </p>
      </div>
      <input
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
        type="text"
        className="bg-gray-300 text-gray-900 rounded focus:outline-none p-3 focus:ring"
      />
    </div>
  );
};
export default App;
