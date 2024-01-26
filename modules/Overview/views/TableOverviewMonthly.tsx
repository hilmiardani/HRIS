import { MonthlyAnalytic, TotalMonthlyAnalytics } from "@/shared/@types/overview";
import { formatCurrency } from "@/shared/support/formater";
import { Table } from "@mantine/core";
import React from "react";

export const TableOverviewMonthly = ({ data, totalMonthlyAnalytic }: { data: MonthlyAnalytic[], totalMonthlyAnalytic: TotalMonthlyAnalytics }) => {
  // Calculate totals
  const totalRooms = data.reduce((acc, item) => acc + item.totalRoom, 0);
  const avgMonthlyRate = data.reduce((acc, item) => acc + item.averageMonthlyPrice, 0);
  const totalmonthlyRevenue = data.reduce((acc, item) => acc + item.totalMonthlyRevenue, 0);
  const avgDailyRate = data.reduce((acc, item) => acc + item.avgDailyRate, 0);

  const datas = data.map((data: MonthlyAnalytic, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <p className="text-xs">{data.property.name}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.unitType.name}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.totalRoom}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.mtdRevenuePerRoom)}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.averageMonthlyPrice)}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.totalMonthlyRevenue)}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.avgDailyRate)}</p>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table withColumnBorders  withRowBorders highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <div className="text-xs ">Hotel</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs ">Type</div>
          </Table.Th>
          <Table.Th>
            <div className="w-5 text-xs ">Total Room</div>
          </Table.Th>
          <Table.Th>
            <div className="w-5 text-xs ">Revenue Per Room</div>
          </Table.Th>
          <Table.Th>
            <div className="w-5 text-xs ">Avg Monthly Price</div>
          </Table.Th>
          <Table.Th>
            <div className="w-5 text-xs ">Total Monthly Revenue</div>
          </Table.Th>
          <Table.Th>
            <div className="w-5 text-xs ">Avg Daily Rate</div>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{datas}</Table.Tbody>
      <Table.Tfoot className="border-t">
        <Table.Tr>
          <Table.Th>
            <p className="text-xs">TOTAL atau AVERAGE</p>
          </Table.Th>
          <Table.Th></Table.Th>
          <Table.Th>
            <p className="text-xs">{totalMonthlyAnalytic.totalRoom}</p>
          </Table.Th>
          <Table.Th />
          <Table.Th>
            <p className="text-xs">{formatCurrency(totalMonthlyAnalytic.averageMonthlyPrice)}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{formatCurrency(totalMonthlyAnalytic.totalMonthlyRevenue)}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{formatCurrency(totalMonthlyAnalytic.avgDailyRate)}</p>
          </Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
};
