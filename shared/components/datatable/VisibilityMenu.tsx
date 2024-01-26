import { useEffect, useState } from "react";
import { DatatableColumn } from "./Datatable";
import { Checkbox } from "@mantine/core";

interface ColumnVisibilityMenuProps<T> {
  columns: DatatableColumn<T>[];
  onColumnToggle: (visibleColumns: string[]) => void;
  tableName?: string
}

export const COLUMN_VISIBILITY_STORAGE_KEY = "columnVisibility";

export function ColumnVisibilityMenu<T>({columns = [], onColumnToggle, tableName}: ColumnVisibilityMenuProps<T>) {
  const [columnVisibility, setColumnVisibility] = useState(columns.map((column) => String(column.key)));

  // Load column visibility state from local storage on component mount
  useEffect(() => {
    const savedColumnVisibility = localStorage.getItem(
      COLUMN_VISIBILITY_STORAGE_KEY+tableName
    );

    if (savedColumnVisibility) {
      setColumnVisibility(JSON.parse(savedColumnVisibility));
    }
  }, []);

  useEffect(() => {
    onColumnToggle(columnVisibility);
    // Save updated column visibility state to local storage
    localStorage.setItem(
      COLUMN_VISIBILITY_STORAGE_KEY+tableName,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility])

  const handleColumnToggle = (columnKey: string) => setColumnVisibility((prev) => prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey] );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectAllChecked = event.target.checked;
    setColumnVisibility(selectAllChecked ? columns.map((column) => String(column.key)) : []);
  };

  return (
    <div>
      <label className="flex items-center m-1">
        <Checkbox 
            label="All"
            color="red"
            checked={columnVisibility.length === columns.length}
            onChange={handleSelectAll}
        />
      </label>
      {columns.map((column, i) => (
        <div key={i} className="m-1 flex items-center">
          <label className="flex items-center">
            <Checkbox
                label={column.label}
                color="red"
                checked={columnVisibility.includes(String(column.key))}
                onChange={() => handleColumnToggle(column.key as string)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}