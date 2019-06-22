import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'

export default (noteRepo, index) => {
  const note$ = noteRepo.getNotes()
    .then(notes => notes[index])
  const render = note => {

    const updateNote = (evt) => {
      note.content = evt.srcElement.value
    }

    const saveChangesAndExit = () => {
      noteRepo.editNote(index, note)
      window.history.back()
    }

    return html`
      <header>
        <a @click="${saveChangesAndExit}">back</a>
        <a>delete</a>
        <a>color&#x2304;</a>
      </header>
      <main>
        <textarea .value="${note.content}" 
          @input="${updateNote}"></textarea>
      </main>`
      }

  return html`${until(note$.then(render), '')}`
}
