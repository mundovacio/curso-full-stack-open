const Header = ({ course }) => <h1>{course}</h1>
const Part = ({ part: { name, exercises } }) => <li><p>{name} - {exercises} exercices</p></li>
const Content = ({ parts }) => <ul>{parts.map(part => <Part part={part} key={part.id + part.name} />)}</ul>
const Total = ({ totalExercises }) => <p><b>Total of {totalExercises} exercises</b></p>

const Course = ({ course: { parts, name } }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </>
  )
}

export default Course