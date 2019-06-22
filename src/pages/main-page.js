import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@1.0.0/directives/repeat.js'

const noteView = (note, onClick) => html`
  <div class="listitem note note-color-${note.color}"
       @click=${onClick}>
    ${note.content}
  </div>`

const notesView = (notes, navNote)=> html`
  ${until(
    notes.then(
      n => repeat(n, (note, index) =>
        noteView(note, () => navNote(index)
      )
    )
  ), '')}`

export default (notes, navNote) => html`
  <header>
    <h1>sticky notes</h1>
    <input id="search-query" type="text" name="query"
      placeholder="search"></input>
    <button id="create"><i>+</i> create</button>
  </header>
  <main>
    ${notesView(notes, navNote)}
  </main>`

