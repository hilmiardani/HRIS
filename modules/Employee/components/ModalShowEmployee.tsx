import { Employee, RequestLeave } from '@/shared/@types'
import { Table, Title } from '@mantine/core'
import React from 'react'

const ModalShowEmployee = ({ employee }: { employee: Employee }) => {
  return (
    <div>
      <Title order={2}>Request Detail</Title>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Name</Table.Td>
            <Table.Td className='!p-4'>{employee.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Job Title</Table.Td>
            <Table.Td className='!p-4'>{employee.jobTitle}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Attendance</Table.Td>
            <Table.Td className='!p-4 text-green-400'>{employee.attendance}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Absence</Table.Td>
            <Table.Td className='!p-4 text-red-400'>{employee.absence}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Sick Leave</Table.Td>
            <Table.Td className='!p-4 text-orange-400'>{employee.sickLeave}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Remaining</Table.Td>
            <Table.Td className='!p-4 text-lime-400'>{employee.remaining}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default ModalShowEmployee