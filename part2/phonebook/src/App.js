import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('new number')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      
      <Persons persons={personsToShow}/>
    </div>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return persons.map(person => <Person key={person.id} person={person}/>)
}

const Person = ({person}) => {
  return <>{person.name} {person.number}<br/></>
}

export default App