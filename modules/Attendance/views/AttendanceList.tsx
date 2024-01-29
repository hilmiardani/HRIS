"use client";

import DatatableHeader from "shared/components/datatable/DatatableHeader";
import { useRouter } from "next/navigation";
import { Attendance } from "@/shared/@types";
import { useApiHandler } from "@/shared/hooks";
import { API_getAllAdmin } from "@/shared/apis";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { deepClone } from "@/shared/utils";
import { TextInput } from "@mantine/core";
import Modal, { ModalRef } from "@/shared/components/Modal";
import ModalShowAttendance from "../components/ModalShowAttendance";
import DatatableMenu from "@/shared/components/datatable/DataTableMenu";

export default function AttendanceList() {
  const router = useRouter();
  const { data, fetch, loadMore, setInput, input } = useApiHandler(API_getAllAdmin, { silence: false, eager: true })

  const [attendanceClicked, setAttendanceClicked] = useState<Attendance>()
  const openCreateView = () => router.push("/admin/create");

  const modalShowAttendance = useRef<ModalRef>(null);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const clone = deepClone(input)
    const cloneInput = {
      ...clone,
      query: {
        ...clone?.query,
        search: e.target.value
      }
    }
    setInput(cloneInput)
  }

  useEffect(() => {
    fetch({})
      .then()
      .catch((error) => console.warn(error))
  }, [])

  const dummyData = [
    {
        id: '1',
        day: 'Senin',
        date: '1 January 2024',
        time: '-',
        desc: 'Cuti',
    },
    {
        id: '2',
        day: 'Selasa',
        date: '2 January 2024',
        time: '8:15',
        desc: 'Hadir',
    },
    {
        id: '3',
        day: 'Rabu',
        date: '3 January 2024',
        time: '8:25',
        desc: 'Hadir',
    },
    {
        id: '4',
        day: 'Kamis',
        date: '4 January 2024',
        time: '8:35',
        desc: 'Hadir',
    },
    {
        id: '5',
        day: 'Jumat',
        date: '5 January 2024',
        time: '9:15',
        desc: 'Hadir',
    },
    {
        id: '6',
        day: 'Sabtu',
        date: '6 January 2024',
        time: '8:10',
        desc: 'Hadir',
    },
    {
        id: '7',
        day: 'Senin',
        date: '8 January 2024',
        time: '8:05',
        desc: 'Hadir',
    },
    {
        id: '8',
        day: 'Selasa',
        date: '9 January 2024',
        time: '8:55',
        desc: 'Hadir',
    },
    {
        id: '9',
        day: 'Rabu',
        date: '10 January 2024',
        time: '8:15',
        desc: 'Hadir',
    },
    {
        id: '10',
        day: 'Kamis',
        date: '11 January 2024',
        time: '8:16',
        desc: 'Hadir',
    },
    {
        id: '11',
        day: 'Jumat',
        date: '12 January 2024',
        time: '8:12',
        desc: 'Hadir',
    },
    {
        id: '12',
        day: 'Sabtu',
        date: '13 January 2024',
        time: '8:15',
        desc: 'Hadir',
    },
    {
        id: '13',
        day: 'Senin',
        date: '15 January 2024',
        time: '8:00',
        desc: 'Hadir',  
    },
    {
        id: '14',
        day: 'Selasa',
        date: '16 January 2024',
        time: '8:34',
        desc: 'Hadir',
    },
    {
      id: '15',
      day: 'Rabu',
      date: '17 January 2024',
      time: '8:22',
      desc: 'Hadir',
    },
    {
      id: '16',
      day: 'Kamis',
      date: '18 January 2024',
      time: '8:50',
      desc: 'Hadir',
    },
    {
      id: '17',
      day: 'Jumat',
      date: '19 January 2024',
      time: '8:20',
      desc: 'Hadir',
    },
    {
      id: '18',
      day: 'Sabtu',
      date: '20 January 2024',
      time: '8:00',
      desc: 'Hadir',
    },
    {
      id: '19',
      day: 'Senin',
      date: '22 January 2024',
      time: '8:03',
      desc: 'Hadir',
    },
    {
      id: '20',
      day: 'Selasa',
      date: '23 January 2024',
      time: '8:09',
      desc: 'Hadir',
    },
    {
      id: '21',
      day: 'Rabu',
      date: '24 January 2024',
      time: '8:23',
      desc: 'Hadir',
    },
    {
      id: '22',
      day: 'Kamis',
      date: '25 January 2024',
      time: '8:43',
      desc: 'Hadir',
    },
    {
      id: '23',
      day: 'Jumat',
      date: '26 January 2024',
      time: '8:40',
      desc: 'Hadir',
    },
    {
      id: '24',
      day: 'Sabtu',
      date: '27 January 2024',
      time: '8:20',
      desc: 'Hadir',
    },
    {
      id: '25',
      day: 'Senin',
      date: '28 January 2024',
      time: '8:48',
      desc: 'Hadir',
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <Modal ref={modalShowAttendance}>
        {attendanceClicked && <ModalShowAttendance attendance={attendanceClicked} />}
      </Modal>
      <DatatableHeader 
        title="Attendance"
        addButton={false}
        leftSection={
          <TextInput 
            className="w-full"
            placeholder="Search Attendance..."
            value={input?.query?.search || ""} 
            onChange={(e) => onChangeSearch(e)}
          />
        }
      />
      <DatatableMenu
        title={["Attendance", "Attendance"]}
        tableName="Attendance"
        data={dummyData || []}
        onRowClick={(value) => {
          setAttendanceClicked(value)
          modalShowAttendance.current?.openModal()
        }}
        columns={[
          {
            key: "day",
            label: "Day",
          },
          {
            key: "date",
            label: "Date",
          },
          {
            key: "time",
            label: "Time",
          },
          {
            key: "desc",
            label: "Desc",
            render(value) {
              const nineAM = new Date().setHours(9, 0, 0, 0);

              const [hours, minutes] = value.time.split(':').map(Number);
              const eventTime = new Date().setHours(hours, minutes, 0, 0);

              const isAfter9AM = eventTime > nineAM;
              return <p className={`${isAfter9AM ? 'text-red-500' : 'text-green-500'}`}>{value.desc}</p>
            }
          },
        ]}
        onScrollEnd={loadMore}
      />
    </div>
  );
}
