const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: 'Test',
        exercises: 1,
        id: 5
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({courseName}) => {
  return <h1>{courseName}</h1>
}

const Content = ({parts}) => {
  return parts.map( part => <p key={part.id}>{part.name} {part.exercises}</p>)
}

const Total = ({parts}) => {
  return <p style={{fontWeight: 'bold'}}>total of {parts.reduce((s, p) => s+p.exercises,0)} exercises</p>
}

export default App