import {html, render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import {until} from 'https://unpkg.com/lit-html@1.0.0/directives/until.js'
import {repeat} from 'https://unpkg.com/lit-html@1.0.0/directives/repeat.js'
export default (noteRepo, id) => {
  const note$ = noteRepo.getNoteById(id)
  const render = note => {

    const updateNote = (evt) => {
      note.content = evt.srcElement.value
      noteRepo.editNote(note)
    }

    const saveChangesAndExit = (evt) => {
      noteRepo.editNote(note)
      window.history.back()
    }

    const deleteNote = (evt) => {
      noteRepo.deleteNote(note.id)
      window.history.back()
    }

    const changeColor = color => {
      const el = document.querySelector('.note.page')
      el.classList.remove(`note-color-${note.color}`)
      note.color = color
      noteRepo.editNote(note)
      el.classList.add(`note-color-${color}`)
      // shh
    }
    
    const colors = ['yellow', 'red', 'blue', 'green', 'pink', 'black']

    const colorDropdown = onselect => html`
      <div class='color-dropdown'>
        <a>color</a>
        <div class="color-dropdown-content">
          ${repeat(colors, color => html`
            <a class="note-color-${color}"
              @click="${() => onselect(color)}"></div>`)}
        </div>
      </div>`

    return html`
      <div class="note page note-color-${note.color}">
        <header>
            <a href=# @click="${saveChangesAndExit}">back</a>
            <a @click="${deleteNote}">delete</a>
            ${colorDropdown(changeColor)}
        </header>
        <main>
          <textarea .value="${note.content}" 
            @input="${updateNote}"></textarea>
        </main>
      </div>`
      }

  return html`${until(note$.then(render), '')}`
}
