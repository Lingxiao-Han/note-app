import { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import ControlPanel from '../components/ControlPanel';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notesApi';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        getNotes()
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
            });
    };

    const handleCreate = () => {
        const content = prompt("Enter note content:");
        if (content) {
            createNote({ content })
                .then(response => {
                    const newNote = { id: response.data, content };
                    setNotes([...notes, newNote]);
                })
                .catch(error => {
                    console.error("Error creating note:", error);
                });
        }
    };

    const handleDelete = (note) => {
        if (!note) return;
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote(note.id)
                .then(() => {
                    setNotes(notes.filter(n => n.id !== note.id));
                    setSelectedNote(null);
                })
                .catch(error => {
                    console.error("Error deleting note:", error);
                });
        }
    };

    const handleEdit = (note) => {
        if (!note) return;
        const newContent = prompt("Edit note content:", note.content);
        if (newContent !== null) {
            updateNote(note.id, { content: newContent })
                .then(() => {
                    const updatedNote = { id: note.id, content: newContent };
                    setNotes(notes.map(n => (n.id === note.id ? updatedNote : n)));
                    setSelectedNote(updatedNote);
                })
                .catch(error => {
                    console.error("Error updating note:", error);
                });
        }
    };

    const handleSelect = (note) => {
        if (selectedNote && selectedNote.id === note.id) {
            setSelectedNote(null);
        } else {
            setSelectedNote(note);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                Height: '150vh',
                margin: '0 auto',
            }}
        >
            <div style={{ width: '600px', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Note App</h1>
                <NoteList
                    notes={notes}
                    selectedNote={selectedNote}
                    onSelect={handleSelect}
                />
                <ControlPanel
                    onCreate={handleCreate}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    selectedNote={selectedNote}
                />
            </div>
        </div>
    );
};

export default Home;
