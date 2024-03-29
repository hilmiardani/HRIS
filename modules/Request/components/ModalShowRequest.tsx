import { RequestLeave } from '@/shared/@types'
import { Table, Title } from '@mantine/core'
import React from 'react'

const ModalShowRequest = ({ request }: { request: RequestLeave }) => {
  return (
    <div>
      <Title order={2}>Request Detail</Title>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Day</Table.Td>
            <Table.Td className='!p-4'>{request.day}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Start Date</Table.Td>
            <Table.Td className='!p-4'>{request.startDate}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>End Date</Table.Td>
            <Table.Td className='!p-4'>{request.endDate}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Request</Table.Td>
            <Table.Td className='!p-4'>{request.type}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Description</Table.Td>
            <Table.Td className={`!p-4 ${request.desc === 'Acc' ? 'text-green-500' : request.desc === 'Pending' ? 'text-orange-500' : ''}`}>{request.desc}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default ModalShowRequest