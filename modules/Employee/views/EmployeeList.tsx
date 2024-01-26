"use client";

import { useRouter } from "next/navigation";
import Datatable from "shared/components/datatable/Datatable";
import { useEffect, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import Download from "@/icons/Download";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";

export default function EmployeeList() {
  const router = useRouter()

  const openCreateView = () => router.push("/admin/customer");
  // const openShowView = (admin: Admin) => router.push(`/admin/${admin.id}`);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onChangeDate = (start: boolean) => (value: DateValue) => {
    // Update the state with the selected date
    if (value !== null) {
      start ? setStartDate(dayjs(value).format('YYYY-MM-DD')) : setEndDate(dayjs(value).format('YYYY-MM-DD'));
    }
  };

  const dummyData = [
    {
        id: '1',
        name: 'Gus Abdoel Majid S.Pd M.Mk',
        jobTitle: 'SENIOR KJHL NI BOS',
        attendance: 25,
        absence: 0,
        sickLeave: 0,
        remaining: 99999,
        phone: '+62 896 0820 7601',
        email: 'abdoelganteng@kjhl.ac.id'
    },
    {
        id: '2',
        name: 'Raymond',
        jobTitle: 'Support Senior',
        attendance: 25,
        absence: 0,
        sickLeave: 0,
        remaining: 12,
        phone: '+62 896 0820 7601',
        email: 'raymond@devs.com'
    },
    {
        id: '3',
        name: 'Hilmi',
        jobTitle: 'Support Senior',
        attendance: 25,
        absence: 0,
        sickLeave: 0,
        remaining: 12,
        phone: '+62 896 0820 7601',
        email: 'hilmi@devs.com'
    },
    {
        id: '4',
        name: 'Akhmad',
        attendance: 25,
        absence: 0,
        sickLeave: 0,
        remaining: 12,
        jobTitle: 'Support Senior',
        phone: '+62 896 0820 7601',
        email: 'akhmad@devs.com'
    },
    {
        id: '5',
        name: 'Tio',
        jobTitle: 'Support Senior',
        attendance: 25,
        absence: 0,
        sickLeave: 0,
        remaining: 12,
        phone: '+62 896 0820 7601',
        email: 'tio@devs.com'
    },
  ]

  useEffect(() => {
    const today = new Date();
    
    // Set startDate to today
    setStartDate(dayjs(today).format('YYYY-MM-DD'));

    // Set endDate to +1 month from startDate
    const nextMonth = dayjs(today).add(1, 'month');
    setEndDate(nextMonth.format('YYYY-MM-DD'));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex gap-4 flex-col">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-52">
            <DateInput
              placeholder="Start Date"
              value={startDate ? dayjs(startDate).toDate() : undefined}
              onChange={onChangeDate(true)}
              className="w-auto whitespace-nowrap"
              valueFormat="D MMM YYYY"
            />
          </div>
          <div className="w-full md:w-52">
            <DateInput
              placeholder="End Date"
              value={endDate ? dayjs(endDate).toDate() : undefined}
              onChange={onChangeDate(false)}
              className="w-auto whitespace-nowrap"
              valueFormat="D MMM YYYY"
            />
          </div>
          <div className="ml-auto">
            <Button className="hover:bg-red-700 outline" leftSection={<Download />}>Download</Button>
          </div>
        </div>
      </div>
      <Datatable
        title={["Employee", "Employee"]}
        data={dummyData || []}
        // onRowClick={openShowView}
        columns={[
          {
            key: "name",
            label: "Name",
          },
          {
            key: "jobTitle",
            label: "Job Title",
          },
          {
            key: "attendance",
            label: "Attendance",
          },
          {
            key: "absence",
            label: "Absence",
          },
          {
            key: "sickLeave",
            label: "Sick Leave",
          },
          {
            key: "remaining",
            label: "Remaining",
          },
          {
            key: "phone",
            label: "Phone",
          },
          {
            key: "email",
            label: "E-mail",
          },
        ]}
        // onScrollEnd={loadMore}
      />
    </div>
  );
}
