import React from "react"
import ReactMde from "react-mde" // used to edit markdown
import Showdown from "showdown" // used to convert markdown to html
import "../index.css"

export function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    /** ReactMde is a react component that allows to edit markdown, it has a toolbar with buttons to add markdown syntax, it also has a preview tab that shows the markdown rendered as html */

    return (
        <section className="pane editor">
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
