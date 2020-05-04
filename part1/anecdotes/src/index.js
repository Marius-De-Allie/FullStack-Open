import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'


// Button comp.
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

// MostVotes comp.
const AnecdoteDetails = ({text, votes}) => (
  <Fragment>
    <p>{text}</p>
    <p>{`has ${votes} votes`}</p>
  </Fragment>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));

  const selectRandom = () => {
    // Generate random number between 0 and one less then length of anecdotes array
    let randomSel = Math.floor(Math.random() * anecdotes.length);
    // Update selected app state value to generated random number.
    setSelected(randomSel)
  };

  const updateVotes = () => {
    // Return new array which includes all elements from old array.
    const newVotes = [...votes];
    // Increase value of currently select anecdote array element by 1.
    newVotes[selected] += 1;
    // Update votes piece of state.
    setVotes(newVotes)
  };

  // Find index of votes array element with highest value.
  const indexOfMaxValue = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDetails 
        text={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button text="vote" handleClick={updateVotes} />
      <Button text="next anecdote" handleClick={selectRandom} />
      <h2>Anecdote with most votes</h2>
      {votes[indexOfMaxValue] <= 0 ? <p>No anecdotes have been voted on as yet</p> :
        <AnecdoteDetails 
          text={anecdotes[indexOfMaxValue]}
          votes={votes[indexOfMaxValue]}
        />
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)