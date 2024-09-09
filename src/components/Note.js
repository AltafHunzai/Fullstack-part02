
const Note = ({ note, isImportant, toggleImportance }) => {
    const label = isImportant ? 'make not important' : 'make important';
    return (
        <li className='note'>
            {note}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
export default Note