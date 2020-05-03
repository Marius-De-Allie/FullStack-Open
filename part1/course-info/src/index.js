import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
  <Fragment>
    <h1>{course}</h1>
  </Fragment>
);

const Part = (props) => (
  <Fragment>
    <p>{`${props.part} ${props.exercises}`}</p>
  </Fragment>
);


const Content = (props) => {
  const {part1, part2, part3, exercises1, exercises2, exercises3} = props;
  return (
    <Fragment>
      <Part 
        part={part1} 
        exercises={exercises1}
      />
      <Part 
        part={part2} 
        exercises={exercises2} 
      />
      <Part 
        part={part3} 
        exercises={exercises3}
      />
    </Fragment>
  )
};

const Total = (props) => (
  <Fragment>
    <p>{`Number of exercises ${props.exercises1 + props.exercises2 + props.exercises3}`}</p>
  </Fragment>
);

const App = () => {
  
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))