"use client";
import React, { Children, useState } from 'react';
import { Calendar, Formats, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import CustomToolbar from '../components/CustomToolbar';
import { API_addPermissionInput } from '@/shared/apis';
import ModalAddPermission from '../components/ModalAddPermission';
import { Button, Text } from '@mantine/core';
import { ContextMenuItem, useContextMenu } from 'use-context-menu';
import ModalAddDispute from '../components/ModalAddDispute';
import { API_addDisputeInput } from '@/shared/apis/calendar/addDispute';

interface CustomEventComponentProps {
  event: {
    id: number;
    title: string;
    start: Date;
    end: Date;
    desc?: string;
    // valueLain?: string
  };
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

const CustomEventComponent: React.FC<CustomEventComponentProps> = ({ event, onMouseOver, onMouseOut }) => {
    // Set a reference time for 9:00 AM in Jakarta timezone
    const nineAM = new Date().setHours(9, 0, 0, 0);

    // Convert event time to Date object
    const [hours, minutes] = event.title.split(':').map(Number);
    const eventTime = new Date().setHours(hours, minutes, 0, 0);

    // Compare the event time with 9:00 AM
    const isAfter9AM = eventTime > nineAM;
    
    return (
        <div className={`cursor-pointer ${event.desc === 'Cuti' ? 'bg-yellow-300' : event.desc === 'Libur' ? 'bg-pink-300' : isAfter9AM ? 'bg-red-300' : 'bg-green-300'} rounded px-2 py-[2px] `}>
            {
                (event.desc === 'Cuti' || event.desc === 'Libur') ? (
                    <>
                        <Text fw={700} size="sm">{event.desc}</Text>
                    </>
                ) : (
                    <>
                        <Text fw={500} size="sm">{event.title}</Text>
                        <Text fw={700} size="sm">{event.desc}</Text>
                    </>
                )
            }
        </div>
    );
};

export default function CustomCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  const now = new Date();
  const [addPermissionModal, setAddPermissionModal] = useState(false);
  const [addDisputeModal, setAddDisputeModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(now);
  const dummyData = [
        {
            id: 1,
            title: dayjs("2024-01-19T00:00:00.000Z").format('H:mm'),
            allDay: true,
            start: new Date(2024, 0, 1),
            end: new Date(2024, 0, 1),
            desc: 'Libur'
        },
        {
            id: 2,
            title: dayjs("2024-01-19T00:00:00.000Z").format('H:mm'),
            start: new Date(2024, 0, 2),
            end: new Date(2024, 0, 2),
            desc: 'Cuti'
        },
        {
            id: 3,
            title: dayjs("2024-01-19T01:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 3),
            end: new Date(2024, 0, 3),
            desc: 'Hadir'
        },
        {
            id: 4,
            title: dayjs("2024-01-19T01:00:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 4),
            end: new Date(2024, 0, 4),
            desc: 'Hadir'
        },
        {
            id: 5,
            title: dayjs("2024-01-19T00:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 5),
            end: new Date(2024, 0, 5),
            desc: 'Hadir'
        },
        {
            id: 6,
            title: dayjs("2024-01-19T00:20:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 6),
            end: new Date(2024, 0, 6),
            desc: 'Hadir'
        },
        {
            id: 7,
            title: dayjs("2024-01-19T02:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 8),
            end: new Date(2024, 0, 8),
            desc: 'Hadir'
        },
        {
            id: 8,
            title: dayjs("2024-01-19T00:45:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 9),
            end: new Date(2024, 0, 9),
            desc: 'Hadir'
        },
        {
            id: 9,
            title: dayjs("2024-01-19T01:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 10),
            end: new Date(2024, 0, 10),
            desc: 'Hadir'
        },
        {
            id: 10,
            title: dayjs("2024-01-19T01:32:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 11),
            end: new Date(2024, 0, 11),
            desc: 'Hadir'
        },
        {
            id: 11,
            title: dayjs("2024-01-19T01:31:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 12),
            end: new Date(2024, 0, 12),
            desc: 'Hadir'
        },
        {
            id: 12,
            title: dayjs("2024-01-19T01:23:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 13),
            end: new Date(2024, 0, 13),
            desc: 'Hadir'
        },
        {
            id: 13,
            title: dayjs("2024-01-19T01:26:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 15),
            end: new Date(2024, 0, 15),
            desc: 'Hadir'
        },
        {
            id: 14,
            title: dayjs("2024-01-19T01:28:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 16),
            end: new Date(2024, 0, 16),
            desc: 'Hadir'
        },
        {
            id: 15,
            title: dayjs("2024-01-19T01:38:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 17),
            end: new Date(2024, 0, 17),
            desc: 'Hadir'
        },
        {
            id: 16,
            title: dayjs("2024-01-19T01:21:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 18),
            end: new Date(2024, 0, 18),
            desc: 'Hadir'
        },
        {
            id: 17,
            title: dayjs("2024-01-19T01:20:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 19),
            end: new Date(2024, 0, 19),
            desc: 'Hadir'
        },
        {
            id: 18,
            title: dayjs("2024-01-19T01:11:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 20),
            end: new Date(2024, 0, 20),
            desc: 'Hadir'
        },
        {
            id: 19,
            title: dayjs("2024-01-19T01:13:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 22),
            end: new Date(2024, 0, 22),
            desc: 'Hadir'
        },
        {
            id: 20,
            title: dayjs("2024-01-19T01:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 23),
            end: new Date(2024, 0, 23),
            desc: 'Hadir'
        },
        {
            id: 21,
            title: dayjs("2024-01-19T00:26:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 24),
            end: new Date(2024, 0, 24),
            desc: 'Hadir'
        },
        {
            id: 22,
            title: dayjs("2024-01-19T00:45:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 25),
            end: new Date(2024, 0, 25),
            desc: 'Hadir'
        },
        {
            id: 23,
            title: dayjs("2024-01-19T00:50:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 26),
            end: new Date(2024, 0, 26),
            desc: 'Hadir'
        },
        {
            id: 24,
            title: dayjs("2024-01-19T01:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 27),
            end: new Date(2024, 0, 27),
            desc: 'Hadir'
        },
        {
            id: 25,
            title: dayjs("2024-01-19T01:07:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 29),
            end: new Date(2024, 0, 29),
            desc: 'Hadir'
        },
        {
            id: 26,
            title: dayjs("2024-01-19T01:05:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 30),
            end: new Date(2024, 0, 30),
            desc: 'Hadir'
        },
        {
            id: 27,
            title: dayjs("2024-01-19T01:15:05.637Z").format('H:mm'),
            start: new Date(2024, 0, 31),
            end: new Date(2024, 0, 31),
            desc: 'Hadir'
        },
        {
            id: 28,
            title: dayjs("2024-01-19T01:27:05.637Z").format('H:mm'),
            start: new Date(2024, 1, 1),
            end: new Date(2024, 1, 1),
            desc: 'Cuti'
        },
    ]

  const [eventsData, setEventsData] = useState(dummyData);

  const handleSelect = ({ start, end }:{ start:any, end: any }) => {
    const title = window.prompt("New Event name " + dayjs(start).format('D MMM YYYY') + " - " + dayjs(end).format('D MMM YYYY'));
    if (title)
      setEventsData([
        ...eventsData,
        {
          id: Math.random(),
          start,
          end,
          title,
          desc: '',
        }
      ]);
  };

  // const dayPropGetter = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
    //     const dayOfWeek = dayjs(date).day();

    //     if (dayOfWeek === 0) {
    //     // Sunday
    //     return {
    //         style: {
    //         backgroundColor: 'red',
    //         color: 'white',
    //         },
    //     };
    //     }

    //     // Default style for other days
    //     return {};
    // };

    // const dayPropGetter = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
    //     const currentDate = dayjs();
    //     const isToday = dayjs(date).isSame(currentDate, 'day');

    //     if (isToday) {
    //         // Today
    //         return {
    //             style: {
    //                 backgroundColor: 'green',
    //                 color: 'white !important',
    //             },
    //         };
    //     }

    //     // Default style for other days
    //     return {};
    // };

    const dayHeaderFormat = (date: any) => {
        const dayOfWeek = dayjs(date).day();

        if (dayOfWeek === 0) {
        // Sunday
        return <div style={{ color: 'red' }}>{dayjs(date).format('dddd')}</div>;
        }

        // Default style for other days
        return dayjs(date).format('dddd');
    };

    const CustomWeekHeader = ({ label }: { label: string }) => {
        const dayIndex = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].indexOf(label);
        const formattedLabel = dayIndex !== -1 ? dayjs().day(dayIndex).format('dddd') : '';        
        return (
            <div>
                <p className={label === 'Min' ? 'text-red-500' : 'text-black'}>{formattedLabel}</p>
            </div>
        );
    };

    const handleAddPermission = () => setAddPermissionModal(true)
    const handleAddDispute = () => setAddDisputeModal(true)
    const onPermissionAdd = async (input: API_addPermissionInput['data'], files: File[]) => {
        console.log('Input Data:', input);
        console.log('Files:', files);
        // console.log('INPUT ',input);
        // await addBooking({ data: input })
        // const res = await addBooking({ 
        //   data: {
        //     customer: input.customer,
        //     term: input.term,
        //     detail: {
        //       name: input.detail.name,
        //       price: input.detail.price,
        //       rate_id: 1,
        //       quantity: input.detail.quantity
        //     },
        //     total: input.total,
        //   } 
        // })
        // if (res) {
        //   setAddBookingModal(false)
        //   load()
        // }
    }

    const onDisputeAdd = async (input: API_addDisputeInput['data'], files: File[]) => {
        console.log('Input Data:', input);
        console.log('Files:', files);
        // console.log('INPUT ',input);
        // await addBooking({ data: input })
        // const res = await addBooking({ 
        //   data: {
        //     customer: input.customer,
        //     term: input.term,
        //     detail: {
        //       name: input.detail.name,
        //       price: input.detail.price,
        //       rate_id: 1,
        //       quantity: input.detail.quantity
        //     },
        //     total: input.total,
        //   } 
        // })
        // if (res) {
        //   setAddBookingModal(false)
        //   load()
        // }
    }

  const handleNavigate = (newDate: Date, view: string) => {
    setCurrentMonth(newDate);
  };

  const filteredEvents = eventsData.filter(event => {
    const eventStart = dayjs(event.start);
    return eventStart.isSame(currentMonth, 'month');
  });

  const customDayFormat = (date: Date) => dayjs(date).format('D');

  const formats: Formats = { dateFormat: customDayFormat };

  const { contextMenu, onContextMenu } = useContextMenu(
    <div>
      <ContextMenuItem>
        Show Info
      </ContextMenuItem>
      <ContextMenuItem>
        Edit
      </ContextMenuItem>
      <ContextMenuItem>
        Delete
      </ContextMenuItem>
    </div>
  );

  return (
    <div className="p-4 flex flex-col gap-6">
        <ModalAddPermission
            opened={addPermissionModal}
            setOpened={setAddPermissionModal}
            onSave={onPermissionAdd}
            onCancel={() => setAddPermissionModal(false)}
        />
        <ModalAddDispute
            opened={addDisputeModal}
            setOpened={setAddDisputeModal}
            onSave={onDisputeAdd}
            onCancel={() => setAddDisputeModal(false)}
        />
        <div className='flex flex-col md:flex-row gap-4'>
            <Button className="!w-full md:!w-fit mt-6 md:mt-0" onClick={handleAddDispute} > Dispute </Button>
            <Button className="!w-full md:!w-fit mt-6 md:mt-0" onClick={handleAddPermission} > Request Leave </Button>
        </div>
        <Calendar
            localizer={localizer}
            //events={eventsData}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            style={{ height: 500 }}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
            components={{
                toolbar: (props) => <CustomToolbar {...props} />,
                month: {
                    header: CustomWeekHeader,
                },
                event: CustomEventComponent
            }}
            // views={['month']}
            // dayPropGetter={dayPropGetter}
            showAllEvents
            tooltipAccessor={'desc'}
            onNavigate={handleNavigate}
            formats={formats}
        />
    </div>
  );
}