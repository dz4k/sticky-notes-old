import LocalStorageNoteRepo from './notes/local-storage.js'

import {render} from 'https://unpkg.com/lit-html@1.0.0/lit-html.js'
import mainView from './pages/main-page.js'

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

const navMain = () => {
  const notes = noteRepo.getNotes()

  render(mainView(notes), document.body)
}

navMain()
