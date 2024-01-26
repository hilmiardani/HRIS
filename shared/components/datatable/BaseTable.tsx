import DefaultSort from "@/icons/DefaultSort";
import SortAsc from "@/icons/SortAsc";
import SortDesc from "@/icons/SortDesc";
import { useIntersectionObserver } from "@/shared/hooks/window";
import { Table } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DatatableColumn<T> {
  label: string | React.ReactNode;
  key: keyof T | (string & {});
  render?: (value: T) => any;
  className?: string;
  linkTo?: (model: T) => string;
}

interface SortirColumn<T> {
  field: string
  sortBy?: string
  sortType?: number
  action?: () => void
}

interface BaseTableProps<T> {
  data: T[];
  columns: DatatableColumn<T>[];
  onRowClick?: (model: T) => void;
  actionHeader?: () => React.ReactNode;
  actionBody?: (model: T) => React.ReactNode;
  rowClassName?: string;
  headerClassName?: string;
  className?: string;
  compact?: boolean;
  footer?: React.ReactNode;
  onScrollEnd?: () => void;
  isLast?: boolean;
  sortir?: SortirColumn<T>[]
  tableName?: string
}

export default function BaseTable<T>({
  data,
  columns,
  onRowClick,
  rowClassName = "",
  headerClassName = "",
  className = "",
  actionHeader = () => <></>,
  actionBody = () => <></>,
  compact = false,
  footer = <></>,
  onScrollEnd,
  isLast,
  sortir
}: BaseTableProps<T>) {
  const loadmoreRef = useIntersectionObserver({ threshold: 0.5 }, (entries) => {
    if (entries[0].isIntersecting) {
      onScrollEnd?.();
    }
  });
  return (
    <Table
      highlightOnHover 
      classNames={{ table: `[ table ${compact ? "table-compact" : ""} ] [ ${className} ]`, thead: "sticky top-0 z-10" }}
    >
      <Table.Thead>
        <Table.Tr>
          {columns.map((column, i) => (
            <Table.Td key={i}>
              <div className="flex gap-2 items-center">
                {column.label}
                {sortir?.map((sortir, i) => {
                  if (sortir.field === column.label && column.key === sortir.sortBy) {
                    return <div onClick={sortir.action} key={i} className="cursor-pointer">
                      {sortir.sortType === 1 ? <SortAsc className="w-4"/> : <SortDesc className="w-4"/>}
                    </div>
                  }  
                  if (sortir.field === column.label && column.key !== sortir.sortBy) {
                    return  <div onClick={sortir.action} key={i} className="cursor-pointer">
                      {<DefaultSort className="w-4" />}
                    </div>
                  }
                })}
              </div>
            </Table.Td>
          ))}
          {actionHeader()}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((model, i) => (
          <Table.Tr key={i} className={rowClassName}>
            {columns.map((c) => {
              const content = c?.render?.(model) ?? model[c.key as keyof T];
              const link = c.linkTo?.(model);
              const className = `[ ${c.className || ""} ] [ ${onRowClick ? "cursor-pointer" : "" } ]`;
              return (
                <Table.Td
                  key={c.key.toString()}
                  className={className}
                  onClick={() => !link && onRowClick?.(model)}
                >
                  {link ? (
                    <Link className="[ hyperlink text-sm ]" href={link}>
                      {content}
                    </Link>
                  ) : (
                    <p className="text-xs">{content}</p>
                  )}
                </Table.Td>
              );
            })}
            {actionBody(model)}
          </Table.Tr>
        ))}
        {!isLast && (
          <Table.Tr>
            <Table.Td ref={loadmoreRef}>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
      {footer}
    </Table>
  );
}
