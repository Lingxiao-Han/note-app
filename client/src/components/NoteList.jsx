import NoteCard from './NoteCard';

const NoteList = ({ notes, selectedNote, onSelect }) => {
    return (
        <div
            style={{
                height: '400px',
                overflowY: 'scroll',
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '20px'
            }}
        >
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isSelected={selectedNote && selectedNote.id === note.id}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default NoteList;
