const ControlPanel = ({ onCreate, onDelete, onEdit, selectedNote }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                gap: '10px'
            }}
        >
            <button onClick={onCreate}>Create</button>
            <button onClick={() => onDelete(selectedNote)} disabled={!selectedNote}>
                Delete
            </button>
            <button onClick={() => onEdit(selectedNote)} disabled={!selectedNote}>
                Edit
            </button>
        </div>
    );
};

export default ControlPanel;
