import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@1.0.0/directives/repeat.js'

const createNote = (noteRepo, navNote) => noteRepo
  .saveNote({ color: 'yellow', content: '' })
  .then(note => navNote(note.id))

const noteView = (note, onClick) => html`
  <div class="listitem note note-color-${note.color}"
       @click=${onClick}>${note.content}</div>`

const notesView = (noteRepo, navNote)=> html`
  ${until(
    noteRepo.getNotes().then(
      n => repeat(n, (note) =>
        noteView(note, () => navNote(note.id))
    )
  ), '')}`

export default (noteRepo, navNote) => html`
  <header>
    <a id=install class=hide>add to homescreen</a>
    <h1>sticky notes</h1>
    <button id="create"
      @click=${() => createNote(noteRepo, navNote)}>

      <i>+</i> create
    </button>
  </header>
  <main>
    ${notesView(noteRepo, navNote)}
  </main>`

