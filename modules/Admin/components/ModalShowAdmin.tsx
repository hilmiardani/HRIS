import { Admin } from '@/shared/@types'
import { Avatar, Image, Table, Title } from '@mantine/core'
import React from 'react'

const ModalShowAdmin = ({ admin }: { admin: Admin }) => {
  return (
    <div>
      <Title order={2}>Admin Detail</Title>
      {/* <div className='flex justify-center'>
        <Avatar src={"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"} size={62} radius="xl" />
      </div> */}
      <div className='flex justify-center'>
        <Image
          radius="xl"
          h={100}
          w="auto"
          fit="contain"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        />
      </div>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Name</Table.Td>
            <Table.Td className='!p-4'>{admin.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Job Title</Table.Td>
            <Table.Td className='!p-4'>{admin.jobTitle}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Email</Table.Td>
            <Table.Td className='!p-4'>{admin.email}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className='whitespace-nowrap !p-0 font-bold'>Phone</Table.Td>
            <Table.Td className='!p-4'>{admin.phone}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default ModalShowAdmin