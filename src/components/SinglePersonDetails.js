export const SinglePersonDetail = ({ Person }) => {
    return (
        <>
            {Person.map((data, index) => {
                return (
                    <>
                        <div key={index}>
                            {data.name} : {data.number}
                        </div>
                    </>
                )
            })}
        </>
    )
}