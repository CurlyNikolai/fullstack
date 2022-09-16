import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('new name')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (newName.length === 0 || newName === 'new name') {
      return
    }
    const personObject = {
      name : newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

const Person = ({person}) => {
  return <>{person.name}<br/></>
}

export default App