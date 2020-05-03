import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Header comp.
const Header = ({text}) => <h1>{text}</h1>;

// Button comp.
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

// StatItem comp.
const StatItem = ({item, value}) => <p>{item} {value}</p>;

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
      <StatItem item="good" value={good} />
      <StatItem item="neutral" value={neutral} />
      <StatItem item="bad" value={bad} />
      <StatItem item="all" value={total} />
      <StatItem item="average" value={(total) / 3} />
      <StatItem item="positive" value={`${((good/total) * 100)} %`} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
