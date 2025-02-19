const express = require('express');

function NoteController(notesService) {
    const router = express.Router();

    router.get('/notes', (req, res) => {
        console.log("Get All Notes");
        const notes = notesService.getAllNotes();
        res.json(notes);
    });

    router.get('/notes/:id', (req, res) => {
        const note = notesService.getNoteById(req.params.id);
        if (!note) return res.status(404).send('Note not found');
        res.json(note);
    });

    router.post('/notes', (req, res) => {
        const newNote = notesService.createNote(req.body);
        res.status(201).json(newNote);
    });

    router.put('/notes/:id', (req, res) => {
        const updatedNote = notesService.updateNote(req.params.id, req.body);
        if (!updatedNote) return res.status(404).send('Note not found');
        res.json(updatedNote);
    });

    router.delete('/notes/:id', (req, res) => {
        const deletedNote = notesService.deleteNote(req.params.id);
        if (!deletedNote) return res.status(404).send('Note not found');
        res.json(deletedNote);
    });

    return router;
}

module.exports = NoteController;
