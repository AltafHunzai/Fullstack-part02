export const ContactList = ({persons}) => {
    return (
        <>
            {
                persons.map((data) => {
                    return (
                        <p key={data.id}>{data.name} : {data.number}</p>
                    )
                })
            }
        </>
    )
}