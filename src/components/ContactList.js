export const ContactList = ({ name, number, handleOnClick }) => {
    return (
        <>
            {
                <div>{name} : {number}
                    <button onClick={handleOnClick} >delete</button>
                </div>
            }
        </>
    )
}