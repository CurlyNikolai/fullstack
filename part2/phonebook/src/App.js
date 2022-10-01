import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('new number')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const existingPerson = persons.find(person => person.name === newName)

    if (newName.length === 0 || newName === 'new name') {
      window.alert("Please insert a valid name and number!")
      return
    }
  
    // If the entered name already exists in phonebook
    if (existingPerson !== undefined) {
      if (existingPerson.number === newNumber) {
        window.alert(newName + ' already exists with this number!')
      }
      else {
        const personObject = {
          name : existingPerson.name,
          number : newNumber,
          id : existingPerson.id
        }
        if (window.confirm(`${existingPerson.name} already added to phonebook, replace old number with new one?`)) {
          personService
            .update(existingPerson.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => (person.id !== existingPerson.id) ? person : updatedPerson))
            })
            .catch(error => {
              alert(`${existingPerson.name} could not be updated!`)
            })
        }
      }
      return
    }
  
    // If the entered name is a new one
    const newID = (persons.length > 0) ? persons[persons.length-1].id + 1 : 1
    const personObject = {
      name : newName,
      number : newNumber,
      id : newID
    }
    
    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`${personObject.name} could not be added`)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then( () => {
          console.log(`deleted ${person.name}`)
          personService
            .getAll()
            .then(updatedPersons => setPersons(updatedPersons))
        })
        .catch(error => {
        alert(`${person.name} might already be deleted, refreshing`)
        personService
            .getAll()
            .then(updatedPersons => setPersons(updatedPersons))
      })
    }
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
      
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
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

const Persons = ({persons, deletePerson}) => {
  return persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)
}

const Person = ({person, deletePerson}) => {
  return <>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button><br/></>
}

export default App