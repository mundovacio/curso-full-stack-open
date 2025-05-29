const Header = ({ course }) => <h1>{course}</h1>
const Part = ({ part: { name, exercises } }) => <li><p>{name} - {exercises} exercices</p></li>
const Content = ({ parts }) => <ul>{parts.map(part => <Part part={part} key={part.name + part.exercises} />)}</ul>
const Total = ({ totalExercises }) => <p>Number of exercises {totalExercises}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </>
  )
}

export default App