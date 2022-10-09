import { useEffect, useState } from 'react';
import {BsFillMoonStarsFill} from 'react-icons/bs';

function App() {

  function getRandomColor(base = 16, length = 6) {
    const max = Math.pow(base, length)
    const decimal = Math.floor(Math.random() * max)
    const hexString = decimal.toString(base).padStart(length, '0')

    return `#${hexString}`;
  }
  
  const [color, setColor] = useState<string>(getRandomColor());
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWrongSelection, setIsWrongSelection] = useState(false);
  const [contador, setContador] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    
    setAnswers([color, getRandomColor(), getRandomColor()].sort(() => 0.5- Math.random()))

  }, [color])

  function handleAnswerClick(answer: string) {
    if (answer === color) {
      setIsWrongSelection(false);
      setContador(contador + 1);
      setColor(getRandomColor());
    } else {
      // No puede bajar de 0
      setContador(Math.max(contador - 1, 0));
      setIsWrongSelection(true);
    }
  }

  return (
    // Div modo noche
    <div className={darkMode ? "dark" : ""}>
      {/* Contenedor general */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-100 transicion-general dark:bg-slate-800">
        {/* Contenedor juego */}
        <div className="flex flex-col justify-center items-center">
          {/* Modo noche */}
          <div className="flex flex-col justify-center items-center w-full mb-8">
            {
              darkMode  
                ? <p className='mb-3 font-bold text-lg transicion-general dark:custom-dark-words'>Volver al modo normal</p>
                : <p className='mb-3 font-bold text-lg text-slate-700 transicion-general dark:custom-dark-words'>¡Prueba el modo noche!</p>
            }
            
            <BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className='cursor-pointer text-slate-700 text-2xl transicion-general dark:custom-dark-words' />

          </div>

          {/* Color */}
          <div className="w-72 h-72 rounded-lg border-2 border-black transicion-general dark:border-white" style={{ background: color }} />

          {/* Respuestas */}
          <div className="flex flex-col justify-center items-center w-full mt-4 space-y-6 md:space-y-0 md:flex-row md:justify-between">
            {
              answers.map(answer => (
                <button onClick={() => handleAnswerClick(answer)} className='uppercase bg-[#46997E] w-full md:w-20 py-2 rounded-md hover:opacity-80 duration-200 hover:-translate-y-0.5 transition-all dark:bg-slate-400 ' key={answer}>
                  <span className='text-red-100 font-bold transicion-general dark:text-slate-800'>{answer}</span>
                </button>
              ))
            }
          </div>

          {/* Contador */}
          <div className="mt-3">
            <p className="text-2xl text-slate-700 font-bold transicion-general dark:custom-dark-words">{contador}</p>
          </div>
          {/* Fallo */}
          <div className="flex justify-center items-center h-10 w-full">
          {isWrongSelection &&<p className='text-xl text-red-500 font-bold transicion-general dark:text-red-500/80'>¡Fallo!</p>}
          </div>

        </div>
        
        </div>
      </div>
  );
}

export default App;
