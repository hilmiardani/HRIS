import { Menu, ScrollArea, Table, Text } from "@mantine/core";
import { Model } from "shared/contracts/model";
import { useCheckAll } from "shared/hooks/form";
import BaseTable from "./BaseTable";
import DotsIcon from "@/icons/DotsIcon";
import { useEffect, useState } from "react";
import { DatatableColumn } from "./Datatable";
import { COLUMN_VISIBILITY_STORAGE_KEY, ColumnVisibilityMenu } from "./VisibilityMenu";

interface SortirColumn<T> {
  field: string;
  sortBy?: string;
  sortType?: number;
  action?: () => void;
}

interface DotMenuProps<T> {
  label: string;
  action?: (model: T) => void;
}

interface DatatableMenuProps<T extends Model> {
  data: T[];
  columns: DatatableColumn<T>[];
  onEdit?: (model: T) => void;
  dotMenus?: DotMenuProps<T>[];
  onDelete?: (model: T) => any;
  title: [singular: string, plural: string];
  onRowClick?: (model: T) => void;
  onScrollEnd?: () => void;
  isLast?: boolean;
  rowClassName?: string;
  sortir?: SortirColumn<T>[];
  opened?: boolean;
  setOpened?: (opened: boolean) => void;
  tableName: string;
  subMenu?: (model: T) => React.ReactNode;
}

export default function DatatableMenu<T extends Model>({
  data,
  onEdit,
  dotMenus,
  onDelete,
  columns = [],
  title = ["data", "data"],
  onRowClick,
  onScrollEnd,
  isLast,
  rowClassName = "",
  sortir,
  opened,
  setOpened,
  tableName,
  subMenu,
}: DatatableMenuProps<T>) {
  const { } = useCheckAll(data as Model[]);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => String(column.key))
  );

  useEffect(() => {
    const savedColumnVisibility = localStorage.getItem(
      COLUMN_VISIBILITY_STORAGE_KEY + tableName
    );

    if (savedColumnVisibility) {
      setVisibleColumns(JSON.parse(savedColumnVisibility));
    }
  }, []);

  return (
    <>
      <ScrollArea className="border border-gray-100 rounded-lg md:max-w-[calc(100vw-176px)] max-w-[calc(100vw-32px)]">
        <BaseTable
          data={data}
          className=""
          rowClassName={rowClassName}
          headerClassName="sticky top-0 right-0"
          columns={columns.filter((column) => visibleColumns.includes(String(column.key)))}
          onRowClick={onRowClick}
          compact
          onScrollEnd={onScrollEnd}
          isLast={isLast}
          sortir={sortir}
          actionHeader={() => (
            <Table.Td className="w-10 sticky right-0">
              <Menu withArrow opened={opened} onChange={setOpened} classNames={{ dropdown: 'bg-gray-300' }}>
                <Menu.Target>
                  <div className="hover:cursor-pointer justify-center">
                    <DotsIcon />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <ColumnVisibilityMenu
                    columns={columns}
                    tableName={tableName}
                    onColumnToggle={setVisibleColumns}
                  />
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          )}
          actionBody={(model) => (
            <Table.Td className="w-10 sticky right-0">
              <Menu offset={-10} withArrow opened={opened} onChange={setOpened} classNames={{ dropdown: 'bg-gray-300' }}>
                <Menu.Target>
                  <div className="hover:cursor-pointer justify-center">
                    <DotsIcon />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Menu</Menu.Label>
                  {subMenu && (
                    typeof subMenu === 'function' ? subMenu(model) : subMenu
                  )}
                  {onEdit && <Menu.Item onClick={() => onEdit(model)}>Edit</Menu.Item>}
                  {onDelete && <Menu.Item onClick={() => onDelete(model)}>Delete</Menu.Item>}
                  {dotMenus &&
                    dotMenus.map((dotMenu, index) => (
                      <Menu.Item key={index} onClick={() => dotMenu.action?.(model)}>
                        {dotMenu.label}
                      </Menu.Item>
                    ))}
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          )}
        />
      </ScrollArea>
    </>
  );
}