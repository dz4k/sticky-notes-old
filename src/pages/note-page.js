import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'

export default (noteRepo, id) => {
  const note$ = noteRepo.getNoteById(id)
  const render = note => {

    const updateNote = (evt) => {
      note.content = evt.srcElement.value
      noteRepo.editNote(note)
    }

    const saveChangesAndExit = () => {
      noteRepo.editNote(note)
      window.history.back()
    }

    return html`
      <div class="note page note-color-${note.color}">
        <header>
            <a href=# @click="${saveChangesAndExit}">back</a>
            <a>delete</a>
            <a>color</a>
        </header>
        <main>
          <textarea .value="${note.content}" 
            @input="${updateNote}"></textarea>
        </main>
      </div>`
      }

  return html`${until(note$.then(render), '')}`
}
