import React, { useEffect, useState } from 'react';
import Loading from './assets/images/loading.gif';
import Typing from './assets/images/typing.jpg';
import Run from './assets/images/run.gif';
import Run2 from './assets/images/run.png';

const App = () => {
  const [allWordsText, setAllWordsText] = useState(
    'Always I will love my passion, Be happy be bright be happy. If no think you can, Then you  have to. I have no special talents but I am only passionately curious. focus on your future otherwise you will find life becomes a blue. Always do small things with great love. life is change. growth is optional. Just believe in yourself. even if you don’t, pretend that you do and at some point you will. choose wisely, to be successful, you have to have heart in your business, and your business in your heart. be strong because things will wet better. it may be stormy now, but it never rains forever.'
  );

  const words = allWordsText.split(' ');
  const [input, setInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timer2, setTimer2] = useState(60);
  const [startTimer, setStartTimer] = useState(false); 
  const [correctWordsChars, setCorrectWordsChars] = useState(0)  
  const [isRotate, setIsRotate] = useState(false)
  const [isRun, setIsRun] = useState(false)

  const again = () => { 
    setInput("")
    setCurrentWordIndex(0)
    setCorrectWords([])
    setTimer(0)
    setTimer2(60)
    setStartTimer(false)
    setCorrectWordsChars(0) 
    setIsRotate(true)
    setIsRun(false)
    setTimeout(() => { 
      setIsRotate(false)
    },1009)
  }

  useEffect(() => {
    if (timer > 59) {
      setStartTimer(false);  
      setIsRun(false)
    }
  }, [timer]);
  

  useEffect(() => {
    let interval;
    if (startTimer) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setTimer2((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTimer]);

  const processInput = (value) => {
    setIsRun(true)
    setStartTimer(true);  
    if  (value.endsWith(' ')) { 
      if (value.trim() === words[currentWordIndex]) {
        setCorrectWordsChars(prev=>prev+value.trim().length) 
      }
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setCorrectWords((prevData) => {
        const newData = [...prevData];
        newData[currentWordIndex] = value.trim() === words[currentWordIndex];
        return newData;
      }); 

      setInput('');
    } else {
      setInput(value);
    }
  };

  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  const [updatable, setUpdatable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateHandler = (value) => {
    setAllWordsText(value);
  };

  const toggleUpdatable = (evt) => {
    if (evt.target.innerText === 'Update') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setUpdatable((prev) => !prev);
      }, 300);
    } else {
      setUpdatable((prev) => !prev);
    }
  };

  return (
    <main className={`${darkMode ? 'darkmode' : 'daymode'} mainSection`}>
  

      <img style={{zIndex:'-1'}} src={Typing} className={`w-full h-full absolute top-0 left-0`} alt="keyboard"/> 
      
      <img className={`${isRun ? 'startRun':'stopRun'} runGif ${timer > 59 ? 'opacity-0' : ' opacity-100'}`} src={isRun ? Run : Run2} alt="run" />

      <div className={` ${timer > 59 ? 'opacity-0' : ' opacity-100'}
       w-32 h-32 rounded-full bg-gray-900 absolute bottom-0 left-0 right-0 m-auto flex flex-col items-center justify-center shadow-lg`}>
        <span className="text-4xl text-white">{timer}</span>
        <span className="text-gray-500">Seconds</span>
      </div>

      <button
        onClick={toggleDarkMode}
        className="bg-gray-600 px-8 py-2 rounded focus:outline-none absolute top-1 right-1 z-50"
      >
        {darkMode ? (
          <div className="w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
        )}
      </button>

      <div className="w-full p-5 relative">
        <h1
          className={`text-4xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Typing Test Practice
        </h1>
        <div className={`${darkMode ? 'bg-gray-800':'bg-gray-700'} rounded flex items-center my-3`}>

          <p className="flex flex-col items-center justify-center border-r-2 border-gray-600 px-7 py-2">
            <span className="text-gray-300">Time</span>
            <span className="text-2xl"> <small className="text-sm text-gray-300">left</small> {timer2}<small className="text-sm text-gray-300">s</small></span>
          </p>

          <div className="flex flex-col items-center justify-center border-r-2 border-gray-600 px-7 py-2">
            <span className="text-gray-300">Speed</span>
            <p>               
              <span className="text-2xl px-5 border-r border-gray-600">
                {(correctWords.filter(Boolean).length / (timer / 60) || 0).toFixed(1)}
                <small className="text-sm text-gray-300">WPM</small>
              </span>

              <span className="text-2xl px-5 ">
                {(correctWordsChars / (timer / 60) || 0).toFixed(0)}
                <small className="text-sm text-gray-300">CPM</small>
              </span>
            </p>
          </div>

          <p className="flex flex-col items-center justify-center border-r-2 border-gray-600 px-7 py-2">
            <span className="text-gray-300">Accuracy</span>
            <span className="text-2xl">{  correctWords.length > 0 ? ((correctWords.filter(Boolean).length / correctWords.length) * 100).toFixed(2) : 0 }<small className="text-sm text-gray-300">%</small></span>
          </p>

          <p className="flex flex-col items-center justify-center px-7 py-2">
            <span className="text-gray-300">Errors</span>
            <span className="text-2xl text-red-500">{correctWords.length - correctWords.filter(Boolean).length}/<small className="text-sm text-gray-300">{correctWords.length}</small> </span>
          </p> 

          <button onClick={again} className={`bg-gray-500 px-4 py-2 rounded focus:outline-none focus:ring  transition-none ml-auto mr-5 flex items-center justify-between`}>
            <p>Again</p>
            <p className={`${isRotate && 'againRefresh'} ml-2`}>
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </p>
          </button>
        </div>
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-white shadow-2xl'} p-12 rounded relative`}>
          <button
            onClick={toggleUpdatable}
            className="transition-none focus:outline-none rounded-full p-2 bg-gray-500 absolute top-5 right-5"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <div
            className={`${
              updatable ? 'block' : 'hidden'
            } absolute w-full rounded bg-gray-900 shadow p-20 z-40 top-0 left-0 right-0 m-auto`}
          >
            <textarea
              className={`${
                darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'
              } focus:outline-none focus:ring p-5 w-full h-52 transition-none rounded`}
              placeholder="Put here your custom text!"
              value={allWordsText}
              onChange={(e) => updateHandler(e.target.value)}
            ></textarea>
            <button
              onClick={toggleUpdatable}
              className="px-5 py-2 rounded focus:outline-none bg-gray-500 focus:ring transition-none"
            >
              Update
            </button>
          </div>

          <div
            className={`w-full ${
              isLoading ? 'block' : 'hidden'
            } z-50 absolute w-full h-full flex justify-center items-center left-0`}
          >
            <img
              className={`w-32 mx-auto z-50`}
              src={Loading}
              alt="Loading..."
            />
          </div>

          {words.map((word, i) => {
            if (i === currentWordIndex) {
              return (
                <span key={i} className="transition-none text-2xl active bg-gray-500">
                  {' '}
                  {word}{' '}
                </span>
              );
            }
            if (correctWords[i] === true) {
              return (
                <span key={i} className="text-2xl text-green-400 not-italic">
                  {' '}
                  {word}{' '}
                </span>
              );
            }
            if (correctWords[i] === false) {
              return (
                <del key={i} className="text-xl text-red-400 mr-2">
                  {' '}
                  {word}{' '}
                </del>
              );
            }
            return (
              <span key={i} className="transition-none text-xl text-gray-400 italic">
                {' '}
                {word}{' '}
              </span>
            );
          })}
        </div>
        <div>
          <input
            className={`${
              darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800'
            } w-96 h-14 rounded absolute -bottom-1 left-0 right-0 m-auto focus:outline-none focus:ring transition-none p-5 shadow`}
            type="text"
            placeholder="Start Typing...."
            onChange={(e) => processInput(e.target.value)} 
            value={ timer > 59 ? 'Your Speed is ( "'+correctWords.filter(Boolean).length+'" Word Per Minute )' : input }
            disabled={timer > 59}
          />
        </div>
      </div>
    </main>
 
  );
};

export default App;