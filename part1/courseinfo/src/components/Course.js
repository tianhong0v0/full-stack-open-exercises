import React from 'react'

const Header = ({ course }) => {
  return <h2>{course.name}</h2>
}

const Total = ({ course }) => {
  const parts = course.parts
  return (
    <b>
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
