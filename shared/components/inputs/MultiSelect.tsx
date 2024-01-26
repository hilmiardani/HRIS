import { Badge, MultiSelectProps, MultiSelect as MantineMultiSelect } from "@mantine/core";
import RedClose from "icons/RedClose";

export default function MultiSelect({ value = [], onChange = () => { }, data = [], ...props }: MultiSelectProps) {
  const unSelect = (unselected: string) => {
    onChange(value.filter(v => v != unselected))
  }
  return <div className="flex flex-col">
    <MantineMultiSelect
      data={data}
      value={value}
      onChange={onChange}
      {...props}
    />
    {/* {value.length > 0 && <div className="py-4 gap-4 flex-row flex-wrap flex">
      {value.map(v => (<Badge key={v} className="gap-2" rightSection={<button onClick={() => unSelect(v)}><RedClose /></button>}>{(data as SelectItem[]).find(x => x.value == v)?.label}</Badge>))}
    </div>
    } */}
  </div>
}
