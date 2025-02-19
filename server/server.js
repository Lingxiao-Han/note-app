const express = require("express");
const cors = require("cors");


const NoteDatabase = require("./database/database");
const NoteController = require("./controllers/controllers");
const NotesService = require("./services/services");

const app = express();
app.use(cors());
app.use(express.json());

const noteDatabase = new NoteDatabase();
const notesService = new NotesService(noteDatabase);
const notesController = new NoteController(notesService);

app.use('/', notesController);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));