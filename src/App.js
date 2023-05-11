import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import { Course } from './components/Course'
import { SearchBar } from './components/SearchBar'
import { FormNewContact } from './components/FormNewContact'
import { ContactList } from './components/ContactList'
import { SinglePersonDetail } from './components/SinglePersonDetails'
import notesService from './services/notes'
import contactService from './services/contact'

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

  const baseUrl = 'http://localhost:3010/persons'

  useEffect(() => {
    notesService.getAll()
      .then(listOfNotes => {
        setNote(listOfNotes)
      })
  }, [])

  useEffect(() => {
    contactService.getallPersons()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const notesToShow = showAll
    ? note
    : note.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    notesService
      .create(noteObject)
      .then(data => {
        setNote(note.concat(data))
        setNewNote('')
      })
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

    contactService
      .addPerson(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
      })
  }

  const toggleImportanceOf = id => {
    const nthNote = note.find(n => n.id === id)
    const changedNote = { ...nthNote, important: !note.important }

    notesService.update(id, changedNote)
      .then(updateImportance => {
        setNote(note.map(n => n.id !== id ? n : updateImportance))
      })
      .catch(error => {
        alert(
          `the note '${error.note.content}' was already deleted from server`
        )
        setNote(notes.filter(n => n.id !== id))
      })
    console.log(`importance of ' ${id} needs to be toggled`)
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

  const fitleredPersonCheck = persons.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const deletePerson = (id) => {
    const contactId = persons.find(data => data.id === id)
    const selectedPerson = { ...contactId, name: !persons.name }
    
    const confirmMessage = window.confirm(`Are you sure you want to delete ${id}`)
    if (confirmMessage) {
      contactService
        .deleteContact(id, selectedPerson)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => [
          window.alert(`${err} is not correct`)
        ])
    }
  }

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
          <Note key={notes.id} note={notes.content} toggleImportance={() => toggleImportanceOf(notes.id)} />
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
        <SearchBar onChange={handleSearchChange} />
        {/* fitlered contacts */}
        {searchTerm.length === 0 ? '' :
          <SinglePersonDetail
            Person={fitleredPersonCheck}
          />
        }
        {/* fitlered contacts */}

        <h2>Add a new contact</h2>
        {/* adding new contact form */}
        <FormNewContact
          onSubmit={addPerson}
          onChange_NameInput={handlePersonNameChange}
          onChange_NumberInput={handlePersonNumberChange}
        />
        {/* adding new contact form */}

        <h2>Numbers</h2>
        {
          persons.map(data =>
            <ContactList key={data.id} name={data.name} number={data.number} handleOnClick={() => deletePerson(data.id)} />
          )
        }
      </div>
    </div>
  )
}

export default App