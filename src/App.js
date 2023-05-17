import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import { Course } from './components/Course'
import { SearchBar } from './components/SearchBar'
import { FormNewContact } from './components/FormNewContact'
import { ContactList } from './components/ContactList'
import { SinglePersonDetail } from './components/SinglePersonDetails'
import notesService from './services/notes'
import contactService from './services/contact'
import { Notification, Success } from './components/Notification'
import { Footer } from './components/Footer'
import countriesServices from './services/countries'
import { SearchCountry } from './components/SearchCountry'
import { Country } from './components/Country'

const App = ({ notes }) => {
  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add a new person')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [searchedCountry, setSearchedCountry] = useState('')
  const [fetchedCountries, setFetchedCountries] = useState()
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

  const toggleImportanceOf = id => {
    const nthNote = note.find(n => n.id === id)
    const changedNote = { ...nthNote, important: !note.important }

    notesService
      .update(id, changedNote)
      .then(returnedNote => {
        setNote(note.map(n => n.id !== id ? n : returnedNote))
        console.log(`importance of ' ${id} needs to be toggled`)
      })
      .catch(error => {
        setErrorMessage(
          `Note '${nthNote.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNote(notes.filter(n => n.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      contactService
        .updatePerson(existingPerson.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setSuccessMessage(`Updated ${existingPerson.name} Successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000);
          setNewName('');
        })
        .catch((error) => {
          setErrorMessage(`Information of ${existingPerson.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        });
    } else {
      contactService
        .addPerson(personObject)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          setSuccessMessage(`added ${addedPerson.name} Successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000)
          setNewName('');
        })
        .catch((error) => {
          console.log('Error adding person:', error);
        });
    }
  }

  const handlePersonNameChange = (event) => {
    if (persons.some(person => person.name.toLowerCase() === event.target.value.toLowerCase())) {
      const isConfirmUpdate = window.confirm(`${event.target.value} is already added to phonebook, replace the old number with a new one?`);
      if (!isConfirmUpdate) {
        event.target.value = ''
      }
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

  const deletePerson = async (id) => {
    const contactId = persons.find(data => data.id === id)
    const selectedPerson = await { ...contactId, name: !persons.name }

    const confirmMessage = window.confirm(`Are you sure you want to delete ${contactId.name}`)
    if (confirmMessage) {
      contactService
        .deleteContact(id, selectedPerson)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => [
          setErrorMessage(`${contactId.name} is already deleted from the server`),
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        ])
    }
  }

  const handleCountrySearch = (event) => {
    setSearchedCountry(event.target.value)

  }

  useEffect(() => {
    if (searchedCountry === '') {

    } else {
      countriesServices
        .getCountries(searchedCountry)
        .then(data => {
          setFetchedCountries(data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [searchedCountry])

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
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(notes =>
          <Note key={notes.id} note={notes.content} isImportant={notes.important} toggleImportance={() => toggleImportanceOf(notes.id)} />
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
        <h1>Phonebook</h1>
        <Notification message={errorMessage} />
        <Success message={successMessage} />
        <SearchBar onChange={handleSearchChange} />
        {/* fitlered contacts */}
        {searchTerm.length === 0 ? '' :
          <SinglePersonDetail
            Person={fitleredPersonCheck}
          />
        }
        {/* fitlered contacts */}

        <h1>Add a new contact</h1>
        {/* adding new contact form */}
        <FormNewContact
          onSubmit={addPerson}
          onChange_NameInput={handlePersonNameChange}
          onChange_NumberInput={handlePersonNumberChange}
        />
        {/* adding new contact form */}

        <h1>Numbers</h1>
        {
          persons.map(data =>
            <ContactList key={data.id} name={data.name} number={data.number} handleOnClick={() => deletePerson(data.id)} />
          )
        }
      </div>
      {/* search countries application UI */}
      <div>
        <h1>Search Countries Detail</h1>
        <SearchCountry onChange={handleCountrySearch} />
        <div>
          <Country fetchedCountries={fetchedCountries} />
          {/* {fetchedCountries.map((data, index) => {
            return (
              <p key={index}>{data.name.common}</p>
            )
          })} */}
        </div>
      </div>
      {/* search countries application UI */}
      <Footer />
    </div>
  )
}

export default App