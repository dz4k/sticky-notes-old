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
  , { color: "pink"
    , content: `
        krkrkrkr
        dkkdkdkekekrkdkdk
        elellrlrlr
        elel` } 
  , { color: "black", content: "Fly me to the moon..." }
  , { color: "yellow", content: "Welcome to Trench." }
  , { color: "green", content: "A monoid in the category of endofunctors" }
  , { color: "blue", content: "yeet" }
  ]

render(notesView(testNotes), mainEl)
