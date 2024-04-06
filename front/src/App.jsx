
import { useState, useEffect } from 'react'

import phoneServices from './services/phones'
import Phonebook from './components/Phonebook'
import InputField from './components/InputField'
import AddForm from './components/AddForm'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [field, setField] = useState('')

  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    phoneServices.getAll()
    .then(phones => setPersons(phones))
  }, [])

  const toShow = persons.filter(person => 
    person.name.toLowerCase().includes(field.toLowerCase()))
  
  const addName = (e) => {
    e.preventDefault()

    const isAlready = persons.find(person => person.name === newName)

    if (isAlready !== undefined) {
      if (window.confirm(`${newName} is already in the phonebook, you want to replace its number instead?`)) {
        phoneServices.update({ ...isAlready, number: newNumber })
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id === response.id ? response : person))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(true)
          setMessage(`info of ${newName} was deleted from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
          setPersons(persons.filter(person => person.name !== newName))
        })
      } 

      return
    }

    phoneServices.create({name: newName, number: newNumber})
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewNumber('')
      setNewName('')
      
      setError(false)
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })
    .catch(error => {
      setError(true)
      setMessage(`Please fill all form data`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })


  }

  const deleteName = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      phoneServices.remove(id)
      .then(response => {
        alert(`${name} has been deleted`)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <InputField hooks={[field, setField]}/>
      <br/>
      <Notification message={message} isError={isError}/>

      <h2>Add a new person</h2>
      <AddForm nameHooks={[newName, setNewName]} numberHooks={[newNumber, setNewNumber]} onSubmit={addName}/>

      <Phonebook toShow={toShow} onClick={deleteName}/>
    </div>
  )
}

export default App
