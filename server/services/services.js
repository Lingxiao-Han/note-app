class NotesService {
    constructor(noteDatabase) {
        this.noteDatabase = noteDatabase;
    }

    getAllNotes() {
        return this.noteDatabase.getAll();
    }

    getNoteById(id) {
        return this.noteDatabase.getById(id);
    }

    createNote(noteData) {
        const newNote = { id: Date.now().toString(), ...noteData };
        return this.noteDatabase.create(newNote);
    }

    updateNote(id, noteData) {
        return this.noteDatabase.update(id, noteData);
    }

    deleteNote(id) {
        return this.noteDatabase.delete(id);
    }
}

module.exports = NotesService;
