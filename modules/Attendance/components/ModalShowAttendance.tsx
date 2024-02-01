import { Admin, Attendance } from '@/shared/@types'
import { Avatar, Image, Table, Title } from '@mantine/core'
import React from 'react'

const ModalShowAttendance = ({ attendance }: { attendance: Attendance }) => {
  const nineAM = new Date().setHours(9, 0, 0, 0);

  const [hours, minutes] = attendance.time.split(':').map(Number);
  const eventTime = new Date().setHours(hours, minutes, 0, 0);

  const isAfter9AM = eventTime > nineAM;
  return (
    <div>
      <Title order={2}>Attendance Detail</Title>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Day</Table.Td>
            <Table.Td className='!p-4'>{attendance.day}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Date</Table.Td>
            <Table.Td className='!p-4'>{attendance.date}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Time</Table.Td>
            <Table.Td className='!p-4'>{attendance.time}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Description</Table.Td>
            <Table.Td className={`${isAfter9AM ? 'text-red-500' : attendance.desc === 'Libur' ? 'text-pink-500' : attendance.desc === 'Cuti' ? 'text-yellow-500' : 'text-green-500'} !p-4`}>{attendance.desc}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default ModalShowAttendance