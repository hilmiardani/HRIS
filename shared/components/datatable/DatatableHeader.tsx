import { Button } from "@mantine/core";
import SearchInput from "../inputs/SearchInput";

interface DatatableHeaderProp {
  onSearch?: (value: string) => void
  title: string
  onCreate?: () => void
  leftSection?: React.ReactNode
  addButton?: boolean
}
export default function DatatableHeader({ onSearch = () => { }, title, onCreate = () => { }, leftSection, addButton = true }: DatatableHeaderProp) {
  return <>
    <h1>{title}</h1>
    <div className={`flex ${addButton ? 'gap-4' : '' } sticky-header justify-between`} >
      <div className="flex w-full">
        {leftSection &&
          leftSection
        }
      </div>
      <div className="flex gap-4">
        {/* <div className="flex w-56">
          <SearchInput placeholder={`Search ${title}`} onSearch={onSearch} />
        </div> */}
        {addButton && <Button className="hover:bg-red-700 outline" onClick={onCreate}>+ {title}</Button>}

      </div>
    </div>
  </>
}
