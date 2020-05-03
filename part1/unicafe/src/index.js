import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Header comp.
const Header = ({text}) => <h1>{text}</h1>;

// Button comp.
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

// StatItem comp.
const StatItem = ({name, value}) => (
  <tr>
    <td>{name}</td> 
    <td>{value}</td>
  </tr>
);

// Statistics comp.
const Statistic = ({name, value}) => <StatItem name={name} value={value} />;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  // Handle click of good button.
  const onGoodClick = () => setGood(good + 1);
  
  // Handle click of neutral button.
  const onNeutralClick = () => setNeutral(neutral + 1);

  // Handle click of bad button.
  const onBadClick = () => setBad(bad + 1);

  // Total feedback value.
  let total = good + neutral + bad;
  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={onGoodClick} text="good" />
      <Button handleClick={onNeutralClick} text="neutral" />
      <Button handleClick={onBadClick} text="bad" />
      <h2>Statistics</h2>
      {good === 0 && neutral === 0 && bad === 0 ? <p>No feedback given</p> : 
        <table>
          <tbody>
            <Statistic name="good" value={good} />
            <Statistic name="bad" value={bad} />
            <Statistic name="neutral" value={neutral} />
            <Statistic name="all" value={total} />
            <Statistic name="average" value={total / 3} />
            <Statistic name="positive" value={(good / total) * 100} />
          </tbody>
        </table>
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);

