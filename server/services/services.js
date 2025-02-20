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
        const id = Date.now().toString();
        const newNote = noteData;
        this.noteDatabase.create(id, newNote);
        return id;
    }

    updateNote(id, noteData) {
        return this.noteDatabase.update(id, noteData);
    }

    deleteNote(id) {
        return this.noteDatabase.delete(id);
    }
}

module.exports = NotesService;
