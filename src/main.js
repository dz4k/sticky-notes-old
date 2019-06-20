import {html, render} from 'https://unpkg.com/lit-html@1.0.0?module'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@2.0.0/directives/repeat.js'
import LocalStorageNoteRepo from './notes/local-storage.js'

const noteView = note => html`
  <div class="note note-color-${note.color}">
    ${note.content}
  </div>`

const notesView = notes => html`
  ${until(notes.then(n => repeat(n, noteView)),
    html`Loading...`)}`

const mainView = notes => html`
  <header>
    <h1>sticky notes</h1>
    <input id="search-query" type="text" name="query"
      placeholder="search"></input>
    <button id="create"><i>+</i> create</button>
  </header>
  <main>
    ${notesView(notes)}
  </main>`

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

window.localStorage.setItem('notes', JSON.stringify(testNotes))

const noteRepo = LocalStorageNoteRepo()

const notes = noteRepo.getNotes()

console.log(notes)
render(mainView(notes), document.body)
