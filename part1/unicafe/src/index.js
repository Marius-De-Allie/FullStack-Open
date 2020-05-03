import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'

// Header comp.
const Header = ({text}) => <h1>{text}</h1>;

// Button comp.
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

// StatItem comp.
const StatItem = ({name, value}) => <p>{name} {value}</p>;

// Statistics comp.
const Statistics = (props) => {
  const {
    good, 
    goodValue, 
    neutral, 
    neutralValue, 
    bad, 
    badValue, 
    all, 
    allValue, 
    average, 
    averageValue, 
    positive, 
    positiveValue} = props;
  return (
    <Fragment>
      <StatItem name={good} value={goodValue} />
      <StatItem name={neutral} value={neutralValue} />
      <StatItem name={bad} value={badValue} />
      <StatItem name={all} value={allValue} />
      <StatItem name={average} value={averageValue} />
      <StatItem name={positive} value={positiveValue} />
    </Fragment>
  )
};

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
        <Statistics 
          good="good"
          goodValue={good}
          neutral="neutral"
          neutralValue={neutral}
          bad="bad"
          badValue={bad}
          all="all"
          allValue={total}
          average="average"
          averageValue={(total) / 3}
          positive="positive"
          positiveValue={`${((good/total) * 100)} %`}
        />
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);

