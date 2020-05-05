import React, { Fragment } from 'react';

// Header Comp.
const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
};

// Part Comp.
const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
};

// Total Comp.
const Total = ({ course }) => {
// Calculate sum of exercises using the Array reduce method.
const sum = course.parts.reduce((total, part) => total += part.exercises, 0)
    return(
        <p>Number of exercises {sum}</p>
    ) 
};
 
// Content Comp.
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part} />  
        )}
      </div>
    )
};

// Course Comp.
const Course = ({course}) => (
    <Fragment>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </Fragment>
  );

  export default Course;
  