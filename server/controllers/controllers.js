const express = require('express');

function NoteController(notesService) {
    const router = express.Router();

    router.get('/notes', async (req, res) => {
        console.log("Get All Notes");
        try {
            const notes = await notesService.getAllNotes();
            const formattedNotes = notes.map(note => ({
                ...note,
                _id: note._id.toString()
            }));
            res.json(formattedNotes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    router.get('/notes/:id', async (req, res) => {
        console.log("Trying to get note ID: ", req.params.id);
        const note = await notesService.getNoteById(req.params.id);
        if (!note) {
            console.log(`Note ID: ${req.params.id} does not exits!`);
            return res.status(404).send('Note not found');
        }
        console.log(`Successfully GET note ID: ${req.params.id}`);
        res.json(note);
    });

    router.post('/notes', async (req, res) => {
        console.log('Posting note with Request Body:', req.body);
        const newNote = await notesService.createNote(req.body);
        res.status(201).json(newNote);
    });

    router.put('/notes/:id', async (req, res) => {
        const updatedNote = await notesService.updateNote(req.params.id, req.body);
        if (!updatedNote) {
            console.log(`Note ID: ${req.params.id} does not exits!`);
            return res.status(404).send('Note not found');
        }
        console.log(`Successfully UPDATED note ID: ${req.params.id}`);
        res.json(updatedNote);
    });

    router.delete('/notes/:id', async (req, res) => {
        const deletedNote = await notesService.deleteNote(req.params.id);
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
