import { ScrollArea } from "@mantine/core";
import { Model } from "shared/contracts/model";
import { useCheckAll } from "shared/hooks/form";
import BaseTable from "./BaseTable";

export interface DatatableColumn<T> {
  label: string | React.ReactNode;
  key: keyof T | (string & {});
  render?: (value: T) => any;
  className?: string;
  linkTo?: (model: T) => string;
  disableRowClick?: boolean;
}

export interface SortirColumn<T> {
  field: string
  sortBy?: string
  sortType?: number
  action?: () => void
}
interface DatatableProps<T extends Model> {
  data: T[];
  columns: DatatableColumn<T>[];
  // onEdit?: (model: T) => void;
  // isDeleting: boolean;
  // onDelete?: (checkedIds: number[]) => void;
  title: [singular: string, plural: string];
  onRowClick?: (model: T) => void;
  onScrollEnd?: () => void;
  isLast?: boolean;
  rowClassName?: string;
  sortir?: SortirColumn<T>[]
}
export default function Datatable<T extends Model>({
  data,
  // onEdit,
  // isDeleting,
  // onDelete,
  columns,
  title = ["data", "data"],
  onRowClick,
  onScrollEnd,
  isLast,
  rowClassName = "",
  sortir,
}: DatatableProps<T>) {
  const {
    // isAllChecked,
    // isChecked,
    // toggleCheck,
    // toggleCheckAll,
    // checkedIds,
    // isPartialChecked,
  } = useCheckAll(data as Model[]);
  return (
    <>
      <ScrollArea className="border border-gray-100 rounded-lg md:max-w-[calc(100vw-234px)] max-w-[calc(100vw-32px)]">
        <BaseTable
          data={data}
          className=""
          rowClassName={rowClassName}
          headerClassName="sticky top-0"
          columns={columns}
          onRowClick={onRowClick}
          compact
          onScrollEnd={onScrollEnd}
          isLast={isLast}
          sortir={sortir}
        />
      </ScrollArea>

      {/* <div className="text-sm flex flex-row justify-between">
        <span className="capitalize">
          {ribu(data.length)} {title[1]}
        </span>
        <span ref={loadmoreRef}>
          {isLast === undefined || isLast ? "No more data" : "Load more..."}
        </span>
      </div> */}
    </>
  );
}
