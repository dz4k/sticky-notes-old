import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@1.0.0/directives/repeat.js'

const createNote = (noteRepo, navNote) => noteRepo.getNotes()
    .then(notes => notes.length)
    .then(length => noteRepo.saveNote(
      { color: 'yellow', content: '' }).then(_ => length))
    .then(length => navNote(length))

const noteView = (note, onClick) => html`
  <div class="listitem note note-color-${note.color}"
       @click=${onClick}>
    ${note.content}
  </div>`

const notesView = (noteRepo, navNote)=> html`
  ${until(
    noteRepo.getNotes().then(
      n => repeat(n, (note, index) =>
        noteView(note, () => navNote(index)
      )
    )
  ), '')}`

export default (noteRepo, navNote) => html`
  <header>
    <h1>sticky notes</h1>
    <input id="search-query" type="text" name="query"
      placeholder="search"></input>
    <button id="create"
      @click=${() => createNote(noteRepo, navNote)}>

      <i>+</i> create
    </button>
  </header>
  <main>
    ${notesView(noteRepo, navNote)}
  </main>`

