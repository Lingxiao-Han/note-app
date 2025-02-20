const NoteCard = ({ note, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(note)}
            style={{
                border: isSelected ? '2px solid blue' : '1px solid #ccc',
                padding: '10px',
                margin: '5px 0',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#e0f7ff' : '#F9E5BC',
                color: 'black',
            }}
        >
            {note.content || 'No content'}
        </div>
    );
};

export default NoteCard;
