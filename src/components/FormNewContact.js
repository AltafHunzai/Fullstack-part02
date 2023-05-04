export const FormNewContact = ({ onSubmit, onChange_NameInput, onChange_NumberInput }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input required onChange={onChange_NameInput} type='text' />
            </div>
            <div>
                number: <input required onChange={onChange_NumberInput} type='text' />
            </div>
            <button type="submit">add</button>
        </form>
    )
}