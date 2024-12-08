import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import { Attributes, Character } from './types';


function App() {
  const [character, setCharacter] = useState<Character>({
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10
    },
    skills: {}
  });

  const incrementAttribute = (attr: keyof Attributes) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: prev.attributes[attr] + 1
      }
    }));
  };

  const decrementAttribute = (attr: keyof Attributes) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: prev.attributes[attr] - 1
      }
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="attributes-section">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map(attr => (
            <div key={attr}>
              <span>{attr}: {character.attributes[attr]}</span>
              <button onClick={() => incrementAttribute(attr)}>+</button>
              <button onClick={() => decrementAttribute(attr)}>-</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
