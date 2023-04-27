
export const Course = ({ header, title, exercises, totalExercises }) => {
    return (
        <>
            <h1>{header}</h1>
            <div>{title} {exercises}</div>
            <strong>total of {totalExercises} exercises</strong>
        </>
    )
}