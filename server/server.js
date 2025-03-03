const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: '../.env' });


const NoteDatabase = require("./database/database");
const NoteController = require("./controllers/controllers");
const NotesService = require("./services/services");

const app = express();
app.use(cors());
app.use(express.json());

const noteDatabase = new NoteDatabase(process.env.MONGO_URI, "note-app-db");
const notesService = new NotesService(noteDatabase);
const notesController = new NoteController(notesService);

app.use('/', notesController);
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
