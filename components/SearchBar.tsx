type SetQuery = React.Dispatch<React.SetStateAction<string>>

export const SearchBar = (props: { setQuery: SetQuery }) => {
  return (
    <input
      placeholder="Search posts"
      className="searchbar mb-4"
      onChange={(e) => props.setQuery(e.target.value)}
    />
  )
}
