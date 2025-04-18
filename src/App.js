import { useState } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import StorageStringManip, { TOTAL_POKEMON } from './StorageStringManip';

function App() {
  const ssm = new StorageStringManip()
  function generatePokemon() {
    return Math.floor(Math.random() * TOTAL_POKEMON)
  }

  const [poke1, setPoke1] = useState(generatePokemon())
  const [poke2, setPoke2] = useState(generatePokemon())

  function resetPokemon() {
    setPoke1(generatePokemon())
    setPoke2(generatePokemon())
  }

  function declareVictor(pokemon) {
    if(pokemon === '1') {
      ssm.incrementWin(poke1)
      ssm.incrementLoss(poke2)
    } else {
      ssm.incrementWin(poke2)
      ssm.incrementLoss(poke1)
    }
    resetPokemon()
  }

  return (
    <div className="App">
      <h1 className='header'>Pokepicker</h1>
      <div onClick={() => declareVictor('1')}>
        <Pokemon Pokemon={poke1} Controller={ssm}/>
      </div>
      <br/>
      <div onClick={() => declareVictor('2')}>
        <Pokemon Pokemon={poke2} Controller={ssm}/>
      </div>
    </div>
  );
}

export default App;
