class NotesService {
    constructor(noteDatabase) {
        this.noteDatabase = noteDatabase;
    }

    async getAllNotes() {
        return await this.noteDatabase.getAll();
    }

    async getNoteById(id) {
        return await this.noteDatabase.getById(id);
    }

    async createNote(noteData) {
        const note = await this.noteDatabase.create(noteData);
        return note;
    }

    async updateNote(id, noteData) {
        return await this.noteDatabase.update(id, noteData);
    }

    async deleteNote(id) {
        return await this.noteDatabase.delete(id);
    }
}

module.exports = NotesService;
