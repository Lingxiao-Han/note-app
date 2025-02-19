class NoteDatabase {
    constructor() {
        this.notes = {};
    }

    getAll() {
        return Object.values(this.notes);
    }

    getById(id) {
        const note = this.notes[id];
        if (note) {
            return note;
        }
        return null;
    }

    create(note) {
        if (note != null) {
            this.notes[note.id] = note;
        }
        return note;
    }

    update(id, noteData) {
        const note = this.notes[id];
        if (note) {
            this.notes[id] = { ...this.notes[id], ...noteData };
            return this.notes[id];
        }
        return null;
    }

    delete(id) {
        const note = this.notes[id];
        delete this.notes[id];
        if (note) {
            return note;
        }
        return null;
    }
}

module.exports = NoteDatabase;