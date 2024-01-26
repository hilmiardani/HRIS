import { TextInput } from "@mantine/core"
import Search from "icons/Search"
import { useInput } from "shared/hooks/form"

interface SearchInputProp {
  placeholder?: string
  onSearch: (value: string) => void
}
const ButtonSearch = ({ onClick }: { onClick: () => void }) => {
  return <button className="px-2" onClick={onClick}><Search /></button>
}
export default function SearchInput({ placeholder, onSearch }: SearchInputProp) {
  const { input, handleInput } = useInput({ search: '' })
  return <TextInput
    placeholder={placeholder}
    rightSection={<ButtonSearch onClick={() => onSearch(input.search)} />}
    value={input.search}
    onChange={handleInput('search')}
    rightSectionWidth={48} />
}
