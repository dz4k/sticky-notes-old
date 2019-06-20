export default function  LocalStorageNoteRepo() {
  let notes

  // TODO: Move to another file so all providers can use
  const checkNote = note => {
    if (note == null
      || typeof note !== 'object'
      // TODO: Check if note.color is one of the allowed colors
      || typeof note.color !== 'string'
      || typeof note.content !== 'string') {
      
      throw `Invalid note: ${note}`
    }
  }

  const saveNotes = () => {
    window.localStorage.notes = JSON.stringify(notes)
  }

  return {
    getNotes() {
      if (!notes) notes = JSON.parse(window.localStorage.notes)
      return Promise.resolve(notes)
    },

    saveNote(note) {
      checkNote(note)
      notes.push(note)
      return Promise.resolve(saveNotes())
    },

    editNote(id, note) {
      if (id >= notes.length) throw 'Tried to edit nonexistent note.'
      checkNote(note)
      notes[id] = note
      return Promise.resolve(saveNotes())
    }
  }
}
