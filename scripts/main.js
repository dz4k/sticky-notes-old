import {html, render} from 'https://unpkg.com/lit-html?module'

const mainEl = document.querySelector("main")

const noteView = note => html`
  <div class="note note-color-${note.color}">
    ${note.content}
  </div>`

const notesView = notes => html`
  ${notes.map(noteView)}`

const testNotes =
  [ { color: "red", content: "Hasselback Potato" }
  , { color: "red"
    , content: `
krkrkrkr
dkkdkdkekekrkdkdk
 elellrlrlr
    elel` } ]

render(notesView(testNotes), mainEl)
