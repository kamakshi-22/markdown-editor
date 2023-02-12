import React from "react"
import {Sidebar} from "./Components/Sidebar"
import {Editor} from "./Components/Editor"
import {data} from "./data"
// data = [ {id: '1', body: `a`}]
import Split from "react-split"
// used to split the screen into two panes (see App)
import {nanoid} from "nanoid"
// used to generate unique ids for notes (see createNewNote)

import "./index.css"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
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
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
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
