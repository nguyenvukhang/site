type SetQuery = React.Dispatch<React.SetStateAction<string>>

/**
 * A flexible search bar component
 */
export const SearchBar = (props: { placeholder: string, setQuery: SetQuery }) => (
  <input
    placeholder={props.placeholder}
    className={
      'focus:outline-offset-0 focus:outline-none focus:outline-accent-400' +
      'bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 w-full mb-4'
    }
    onChange={(e) => props.setQuery(e.target.value)}
  />
)
