import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1},
    { name: 'Antti Hellas', number: '040-7654321', id: 2},
    { name: 'Arto Kalland', number: '050-1234567', id: 3},
    { name: 'Emil Levo', number: '050-4327638', id: 4},
  ]) 
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('new number')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    const duplicate = names.some((name) => name === newName)
    if (newName.length === 0 || newName === 'new name' || duplicate) {
      if (duplicate)
        window.alert(newName + ' is already added to the phonebook')
      return
    }
    const personObject = {
      name : newName,
      number : newNumber,
      id : persons.length+1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.substring(0, filter.length).toLowerCase() === filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

const Person = ({person}) => {
  return <>{person.name} {person.number}<br/></>
}

export default App