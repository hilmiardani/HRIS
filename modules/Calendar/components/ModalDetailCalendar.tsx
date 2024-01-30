import { Absence, RequestLeave } from '@/shared/@types'
import { Table, Title } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'

const ModalDetailCalendar = ({ absence }: { absence: Absence }) => {
    const nineAM = new Date().setHours(9, 0, 0, 0);

    const [hours, minutes] = absence.title.split(':').map(Number);
    const eventTime = new Date().setHours(hours, minutes, 0, 0);

    const isAfter9AM = eventTime > nineAM;
    return (
        <div>
        <Title order={2}>Absence Detail</Title>
        <Table withRowBorders={false}>
            <Table.Tbody>
            <Table.Tr>
                <Table.Td className='whitespace-nowrap !p-0 font-bold'>Absence Hour</Table.Td>
                <Table.Td className='!p-4'>{absence.desc === 'Hadir' ? absence.title : '-'}</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='whitespace-nowrap !p-0 font-bold'>Day</Table.Td>
                <Table.Td className='!p-4'>{dayjs(absence.start).format('dddd')}</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='whitespace-nowrap !p-0 font-bold'>Date</Table.Td>
                <Table.Td className='!p-4'>{dayjs(absence.start).format('D MMMM YYYY')}</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='whitespace-nowrap !p-0 font-bold'>Description</Table.Td>
                <Table.Td className={`${isAfter9AM ? 'text-red-500' : absence.desc === 'Libur' ? 'text-pink-500' : absence.desc === 'Cuti' ? 'text-yellow-500' : 'text-green-500'} !p-4`}>{absence.desc}</Table.Td>
            </Table.Tr>
            </Table.Tbody>
        </Table>
        </div>
    )
}

export default ModalDetailCalendar