export const SearchBar = ({onChange}) => {
    return (
        <div style={{ margin: '15px auto' }}>
          Filter shown with <input type="search" name="search" onChange={onChange} placeholder='search by Name' />
        </div>
    )
}