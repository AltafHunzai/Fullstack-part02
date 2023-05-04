import React, { useState } from 'react'
import Note from './components/Note'
import { Course } from './components/Course'

const App = ({ notes }) => {
  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add a new person')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const notesToShow = showAll
    ? note
    : note.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNote(note.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName(event.target.value)
  }

  const handlePersonNameChange = (event) => {
    if (persons.some(person => person.name === event.target.value)) {
      alert(`${event.target.value} is already added to phonebook.`);
    }
    setNewName(event.target.value)
  }

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const fitleredPersonCheck = persons.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      {course.map((course) => {
        return (
          <Course
            key={course.id}
            header={course.name}
            totalExercises={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
            title={course.parts.map((data) => {
              return (
                <p key={data.id}>{data.name} {data.exercises}</p>
              )
            })}
            exercises={course.exercises} />
        )
      })}

      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(notes =>
          <Note key={notes.id} note={notes} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <div>
        <h2>Phonebook</h2>
        <div style={{ margin: '15px auto' }}>
          Filter shown with <input type="search" name="search" onChange={handleSearchChange} placeholder='search by Name' />
        </div>
        {/* fitlered contacts */}
        <div>
          {fitleredPersonCheck.map((data, index) => {
            return(
              <div key={index}>
                {data.name} : {data.number}
              </div>
            )
          })}
        </div>
        {/* fitlered contacts */}

        <h2>Add a new contact</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input required onChange={handlePersonNameChange} type='text' />
          </div>
          <div>
            number: <input required onChange={handlePersonNumberChange} type='text' />
          </div>
          <button type="submit">add</button>
        </form>
        <h2>Numbers</h2>
        {persons.map((data) => {
          return (
            <p key={data.id}>{data.name} : {data.number}</p>
          )
        })}
      </div>
    </div>
  )
}

export default App