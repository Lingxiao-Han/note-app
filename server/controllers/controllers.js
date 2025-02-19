const express = require('express');

function NoteController(notesService) {
    const router = express.Router();

    router.get('/notes', (req, res) => {
        console.log("Get All Notes");
        const notes = notesService.getAllNotes();
        res.json(notes);
    });

    router.get('/notes/:id', (req, res) => {
        console.log("Trying to get note ID: ", req.params.id);
        const note = notesService.getNoteById(req.params.id);
        if (!note) {
            console.log(`Note ID: ${req.params.id} does not exits!`);
            return res.status(404).send('Note not found');
        }
        console.log(`Successfully GET note ID: ${req.params.id}`);
        res.json(note);
    });

    router.post('/notes', (req, res) => {
        console.log('Posting note with Request Body:', req.body);
        const newNote = notesService.createNote(req.body);
        res.status(201).json(newNote);
    });

    router.put('/notes/:id', (req, res) => {
        const updatedNote = notesService.updateNote(req.params.id, req.body);
        if (!updatedNote) {
            console.log(`Note ID: ${req.params.id} does not exits!`);
            return res.status(404).send('Note not found');
        }
        console.log(`Successfully UPDATED note ID: ${req.params.id}`);
        res.json(updatedNote);
    });

    router.delete('/notes/:id', (req, res) => {
        const deletedNote = notesService.deleteNote(req.params.id);
        if (!deletedNote) {
            console.log(`Note ID: ${req.params.id} does not exits!`);
            return res.status(404).send('Note not found');
        }
        console.log(`Successfully DELETED note ID: ${req.params.id}`);
        res.json(deletedNote);
    });

    return router;
}

module.exports = NoteController;
