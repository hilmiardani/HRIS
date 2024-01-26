import { AllAnalytic, TotalAllAnalytics } from "@/shared/@types/overview";
import { formatCurrency } from "@/shared/support/formater";
import { Table } from "@mantine/core";
import React from "react";

export const TableOverviewGlobal = ({ data, totalAllAnalytic }: { data: AllAnalytic[], totalAllAnalytic: TotalAllAnalytics }) => {
  // Calculate totals
  const totalRoom = data.reduce((acc, item) => acc + item.totalRoom, 0);
  const totalMonthly = data.reduce((acc, item) => acc + item.totalMonthly, 0);
  const totalDaily = data.reduce((acc, item) => acc + item.totalDaily, 0);
  const totalUnsold = data.reduce((acc, item) => acc + item.totalUnsold, 0);
  const occRate = data.reduce((acc, item) => acc + item.occRate, 0);
  const datas = data.map((data: AllAnalytic, index) => (
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
        <p className="text-xs">{data.totalMonthly}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.totalDaily}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.totalUnsold}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{formatCurrency(data.mtdRevenuePerRoom)}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{formatCurrency(data.rawMtDRevenue)}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.occRate >= 0 ? data.occRate+'%' : ''}</p>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table withColumnBorders withRowBorders highlightOnHover >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <div className="text-xs">Hotel</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Type</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Total Room</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Total Monthly</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Total Daily</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Total Unsold</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Revenue Per Room</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">Raw Revenue</div>
          </Table.Th>
          <Table.Th>
            <div className="text-xs">OCC Rate</div>
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
            <p className="text-xs">{totalAllAnalytic.totalRoom}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{totalAllAnalytic.totalMonthly}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{totalAllAnalytic.totalDaily}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{totalAllAnalytic.totalUnsold}</p>
          </Table.Th>
          <Table.Th>
            <p className="text-xs">{formatCurrency(totalAllAnalytic.totalMtdRevenuePerRoom)}</p>
          </Table.Th>
          <Table.Th/>
          <Table.Th>
            <p className="text-xs">{totalAllAnalytic.occRate >= 0 ? totalAllAnalytic.occRate+'%' : ''}</p>
          </Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
};
