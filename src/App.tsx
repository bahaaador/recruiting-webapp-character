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
      Charisma: 10,
    },
    skills: {},
  });

  const incrementAttribute = (attr: keyof Attributes) => {
    setCharacter((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: prev.attributes[attr] + 1,
      },
    }));
  };

  const decrementAttribute = (attr: keyof Attributes) => {
    setCharacter((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: prev.attributes[attr] - 1,
      },
    }));
  };

  const meetsClassRequirements = (className: string) => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(
      ([attr, value]) => character.attributes[attr] >= value
    );
  };

  const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
  };

  const calculateAvailableSkillPoints = () => {
    const intModifier = calculateModifier(character.attributes.Intelligence);
    return 10 + 4 * intModifier;
  };

  const calculateSpentPoints = () => {
    return Object.values(character.skills).reduce(
      (sum, points) => sum + points,
      0
    );
  };

  const calculateSkillTotal = (skillName: string) => {
    const skill = SKILL_LIST.find((s) => s.name === skillName);
    const attributeModifier = calculateModifier(
      character.attributes[skill.attributeModifier]
    );
    const pointsSpent = character.skills[skillName] || 0;
    return pointsSpent + attributeModifier;
  };

  const incrementSkill = (skillName: string) => {
    const availablePoints = calculateAvailableSkillPoints();
    const spentPoints = calculateSpentPoints();

    if (spentPoints < availablePoints) {
      setCharacter((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillName]: (prev.skills[skillName] || 0) + 1,
        },
      }));
    }
  };

  const decrementSkill = (skillName: string) => {
    if (character.skills[skillName] > 0) {
      setCharacter((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillName]: prev.skills[skillName] - 1,
        },
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="attributes-section">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attr) => (
            <div key={attr}>
              <span>
                {attr}: {character.attributes[attr]}
              </span>
              <span>
                (Modifier: {calculateModifier(character.attributes[attr])})
              </span>
              <button onClick={() => incrementAttribute(attr)}>+</button>
              <button onClick={() => decrementAttribute(attr)}>-</button>
            </div>
          ))}
        </div>
        <div className="classes-section">
          <h2>Classes</h2>
          {Object.entries(CLASS_LIST).map(([className, requirements]) => (
            <div
              onClick={() => alert("Minimum requirements for "+className + "\n" + JSON.stringify(requirements, null, 2))}
              key={className}
              className={`class-card ${
                meetsClassRequirements(className)
                  ? "class-card-active"
                  : "class-card-inactive"
              }`}
            >
              <h3>{className}</h3>
            </div>
          ))}
        </div>
        <div className="skills-section">
          <h2>Skills</h2>
          <p>
            Available Skill Points:{" "}
            {calculateAvailableSkillPoints() - calculateSpentPoints()}
          </p>
          {SKILL_LIST.map((skill) => (
            <div key={skill.name} className="skill-card">
              <span className="skill-card-name">{skill.name}</span>
              <span>Points: {character.skills[skill.name] || 0} </span>
              <button onClick={() => incrementSkill(skill.name)}>+</button>
              <button onClick={() => decrementSkill(skill.name)}>-</button>
              <span>
                Modifier ({skill.attributeModifier}):
                {calculateModifier(
                  character.attributes[skill.attributeModifier]
                )}
              </span>
              <span> Total: {calculateSkillTotal(skill.name)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;