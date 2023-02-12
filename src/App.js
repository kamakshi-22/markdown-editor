import React from "react"
import { Sidebar } from "./Components/Sidebar"
import { Editor } from "./Components/Editor"
import { data } from "./data"
// data = [ {id: '1', body: `a`}]
import Split from "react-split"
// used to split the screen into two panes (see App) and to resize them (see index.css)
import { nanoid } from "nanoid"
// used to generate unique ids for notes (see createNewNote)

import "./index.css"

export default function App() {
  // get notes from local storage or use the data array if there are no notes in local storage
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  )

  // used to set the current note id (see Sidebar)
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  // used to set notes to local storage
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // used to create a new instance of a note (with a unique id) and add it to the notes array 
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    // add the note to the top of notes array
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  // used to add text to the body of the note in the data array
  function updateNote(text) {
    setNotes(oldNotes => {
      const newArray = [] // Create a new empty array
      for(let i = 0; i < oldNotes.length; i++) { // Loop over the original array
          const oldNote = oldNotes[i]
          if(oldNote.id === currentNoteId) { // if the id of oldnote matches
              newArray.unshift({ ...oldNote, body: text })
              // put the updated note at the beginning of the new array
          } else {
              newArray.push(oldNote)
              // push the old note to the end of the new array
          }
      }
      return newArray
    })

    /** This does not rearrange the notes
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
         })) */
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>

      }
    </main>
  )
}


/**
 * Features:
 * - create a new note
 * - edit a note
 * - delete a note
 * - save notes to local storage
 * - load notes from local storage
 * - add a new note to the top of the notes list
 * - add note summary titles
 * - move modified notes to the top of the notes list
 */
