import FormUpdateRate, { IUpdateRate } from "@/modules/Rates/component/FormUpdateRate";
import { DailyAnalytic, TotalDailyAnalytics } from "@/shared/@types/overview";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { IDR, formatCurrency } from "@/shared/support/formater";
import { Button, Table } from "@mantine/core";
import React, { useRef, useState } from "react";

interface Daily {
  date: string,
  data: DailyAnalytic[],
  totalDailyAnalytic: TotalDailyAnalytics
  load: any
}
export const TableOverviewDaily = ({ data, totalDailyAnalytic, date, load }: Daily) => {
  const showedForm = useRef<ModalRef>(null)
  const [formRateData, setFormRateData] = useState<IUpdateRate>({
    formData: {
      date: '',
      price: 0,
      unitTypeId: '',
      propertyId: ''
    },
  });

  const handleUpdateRate = (result: any) => {
    if (result) {
      showedForm.current?.closeModal()
      load()
    }
  }
  // Calculate totals
  const totalRoom = data.reduce((acc, item) => acc + item.totalRoom, 0);
  const closedRoom = data.reduce((acc, item) => acc + item.closedRoom, 0);
  const soldRoom = data.reduce((acc, item) => acc + item.soldRoom, 0);
  const availableRoom = data.reduce((acc, item) => acc + item.availableRoom, 0);
  const avgDailyRate = data.reduce((acc, item) => acc + item.avgDailyRoomRate, 0);
  // const currentRate = data.reduce((acc, item) => acc + item.currentRate, 0);
  const totalRevenue = data.reduce((acc, item) => acc + item.totalRevenue, 0);
  const occRate = data.reduce((acc, item) => acc + item.occRate, 0);
  const datas = data.map((data: DailyAnalytic, index) => (
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
        <p className="text-xs">{data.closedRoom}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.soldRoom}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{data.availableRoom}</p>
      </Table.Td>
      <Table.Td>
        <p className="text-xs">{formatCurrency(data.mtdRevenuePerRoom)}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.avgDailyRoomRate)}</p>
      </Table.Td>
      <Table.Td w={100}>
        <Button className="outline" size="compact-xs" onClick={() => {
          setFormRateData({
            formData: {
              date: date,
              price: data.currentRate,
              unitTypeId: data.unitType.id,
              propertyId: data.property.id
            },
          })
          showedForm.current?.openModal()
        }}>{formatCurrency(data.currentRate)}</Button>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{formatCurrency(data.totalRevenue)}</p>
      </Table.Td>
      <Table.Td>
        <p className="font-bold text-xs">{data.occRate >= 0 ? data.occRate+'%' : ''}</p>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Modal ref={showedForm}>
        <FormUpdateRate formData={formRateData.formData} callbackResponse={handleUpdateRate} />
      </Modal>
      <Table withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <div className="text-center text-xs">Hotel</div>
            </Table.Th>
            <Table.Th>
              <div className="text-center text-xs">Type</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Total Room</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Closed Room</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Sold Room</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Available Room</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Revenue Per Room</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Avg Daily Room Rate</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Current Rate</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">Total Revenue</div>
            </Table.Th>
            <Table.Th>
              <div className="w-5 text-xs">OCC Rate</div>
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
              <p className="text-xs">{totalDailyAnalytic.totalRoom}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{totalDailyAnalytic.closedRoom}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{totalDailyAnalytic.soldRoom}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{totalDailyAnalytic.totalAvailable}</p>
            </Table.Th>
            <Table.Th/>
            <Table.Th>
              <p className="text-xs">{formatCurrency(totalDailyAnalytic.avgDailyRoomRate)}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{formatCurrency(totalDailyAnalytic.currentRate)}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{formatCurrency(totalDailyAnalytic.totalRevenue)}</p>
            </Table.Th>
            <Table.Th>
              <p className="text-xs">{totalDailyAnalytic.occRate}%</p>
            </Table.Th>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </>
  );
};
