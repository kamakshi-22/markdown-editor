import React from "react"

export function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">
                    {/* split the note body into an array of strings, then get the first element of the array */}
                    {note.body.split("\n")[0]}
                </h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                    // on click, call the deleteNote function and pass it the note id as an argument (see App.js)
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
