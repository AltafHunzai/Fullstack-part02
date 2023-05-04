export const SinglePersonDetail = ({fitleredPersonCheck}) => {
    return (
        <>
            {fitleredPersonCheck.map((data, index) => {
                return (
                    <div key={index}>
                        {data.name} : {data.number}
                    </div>
                )
            })}
        </>
    )
}