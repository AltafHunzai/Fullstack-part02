import React, { useState } from 'react'
import Note from './components/Note'
import { Course } from './components/Course'

const App = ({ notes }) => {
  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)

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
    console.log(event.target.value)
    setNewNote(event.target.value)
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
    </div>
  )
}

export default App