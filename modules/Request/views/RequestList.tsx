"use client";

import DatatableHeader from "shared/components/datatable/DatatableHeader";
import { useRouter } from "next/navigation";
import Datatable from "shared/components/datatable/Datatable";
import { RequestLeave } from "@/shared/@types";
import { useApiHandler } from "@/shared/hooks";
import { API_addPermissionInput, API_getAllAdmin } from "@/shared/apis";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { deepClone } from "@/shared/utils";
import { TextInput } from "@mantine/core";
import Modal, { ModalRef } from "@/shared/components/Modal";
import ModalShowRequest from "../components/ModalShowRequest";
import ModalAddPermission from "@/modules/Calendar/components/ModalAddPermission";

export default function AttendanceList() {
  const router = useRouter();
  const { data, fetch, loadMore, setInput, input } = useApiHandler(API_getAllAdmin, { silence: false, eager: true })

  const [requestClicked, setRequestClicked] = useState<RequestLeave>()
  const [addPermissionModal, setAddPermissionModal] = useState(false);
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
      day: 'Selasa',
      date: '2 January 2024',
      request: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '2',
      day: 'Rabu',
      date: '3 January 2024',
      request: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '3',
      day: 'Kamis',
      date: '4 January 2024',
      request: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '4',
      day: 'Jumat',
      date: '9 February 2024',
      request: 'Cuti',
      desc: 'Pending'
    },
    {
      id: '5',
      day: 'Senin',
      date: '12 February 2024',
      request: 'Cuti',
      desc: 'Pending'
    },
    {
      id: '6',
      day: 'Selasa',
      date: '13 February 2024',
      request: 'Cuti',
      desc: 'Pending'
    }
  ]

  const handleAddPermission = () => setAddPermissionModal(true)
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

  return (
    <div className="flex flex-col gap-6">
      <Modal ref={modalShowAttendance}>
        {requestClicked && <ModalShowRequest request={requestClicked} />}
      </Modal>
      <ModalAddPermission
        opened={addPermissionModal}
        setOpened={setAddPermissionModal}
        onSave={onPermissionAdd}
        onCancel={() => setAddPermissionModal(false)}
      />
      <DatatableHeader 
        title="Request Leave"
        onCreate={handleAddPermission}
        leftSection={
          <TextInput 
            className="w-full"
            placeholder="Search Request Leave..."
            value={input?.query?.search || ""} 
            onChange={(e) => onChangeSearch(e)}
          />
        }
      />
      <Datatable
        title={["Attendance", "Attendance"]}
        data={dummyData || []}
        onRowClick={(value) => {
          setRequestClicked(value)
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
            key: "request",
            label: "Request",
          },
          {
            key: "desc",
            label: "Desc",
            render(value) {
              return <p className={`${value.desc === 'Acc' ? 'text-green-500' : value.desc === 'Pending' ? 'text-orange-500' : ''}`}>{value.desc}</p>
            }
          },
        ]}
        onScrollEnd={loadMore}
      />
    </div>
  );
}
