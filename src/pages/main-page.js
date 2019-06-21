import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@1.0.0/directives/repeat.js'

const noteView = note => html`
  <div class="note note-color-${note.color}">
    ${note.content}
  </div>`

const notesView = notes => html`
  ${until(notes.then(n => repeat(n, noteView)), '')}`

export default notes => html`
  <header>
    <h1>sticky notes</h1>
    <input id="search-query" type="text" name="query"
      placeholder="search"></input>
    <button id="create"><i>+</i> create</button>
  </header>
  <main>
    ${notesView(notes)}
  </main>`

