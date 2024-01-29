"use client";

import DatatableHeader from "shared/components/datatable/DatatableHeader";
import { useRouter } from "next/navigation";
import Datatable from "shared/components/datatable/Datatable";
import { Permission, RequestLeave } from "@/shared/@types";
import { useApiHandler } from "@/shared/hooks";
import { APIEditPermission, API_addPermissionInput, API_getAllAdmin } from "@/shared/apis";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { deepClone } from "@/shared/utils";
import { TextInput } from "@mantine/core";
import Modal, { ModalRef } from "@/shared/components/Modal";
import ModalShowRequest from "../components/ModalShowRequest";
import ModalAddPermission from "@/modules/Calendar/components/ModalAddPermission";
import DatatableMenu from "@/shared/components/datatable/DataTableMenu";
import ModalEditPermission from "@/modules/Calendar/components/ModalEditPermission";

export default function AttendanceList() {
  const router = useRouter();
  const { data, fetch, loadMore, setInput, input } = useApiHandler(API_getAllAdmin, { silence: false, eager: true })

  const [requestClicked, setRequestClicked] = useState<RequestLeave>()
  const [addPermissionModal, setAddPermissionModal] = useState(false);
  const [editPermissionModal, setEditPermissionModal] = useState<Permission | undefined>();

  const modalShowRequest = useRef<ModalRef>(null);

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
      startDate: '2 January 2024',
      endDate: '2 January 2024',
      type: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '2',
      day: 'Rabu',
      startDate: '3 January 2024',
      endDate: '3 January 2024',
      type: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '3',
      day: 'Kamis',
      startDate: '4 January 2024',
      endDate: '4 January 2024',
      type: 'Cuti Melahirkan',
      desc: 'Acc'
    },
    {
      id: '4',
      day: 'Jumat',
      startDate: '9 February 2024',
      endDate: '9 February 2024',
      type: 'Cuti',
      desc: 'Pending'
    },
    {
      id: '5',
      day: 'Senin',
      startDate: '12 February 2024',
      endDate: '12 February 2024',
      type: 'Cuti',
      desc: 'Pending'
    },
    {
      id: '6',
      day: 'Selasa',
      startDate: '13 February 2024',
      endDate: '13 February 2024',
      type: 'Cuti',
      desc: 'Pending'
    }
  ]

  const handleAddPermission = () => setAddPermissionModal(true)
  const handleEditPermission = (permissionSelected: Permission) => {
    const permission: Permission | undefined = dummyData !== undefined ? dummyData?.find(({ id }) => id === permissionSelected.id) : undefined    
    if (permission) setEditPermissionModal(permission)
  }
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

  const onBookingEdit = async (input: APIEditPermission) => {
    console.log('INPUT ',input);
    // const res = await editBooking(input)
    // if (res) {
    //   setEditBookingModal(undefined)
    //   load()
    // }
  }

  return (
    <div className="flex flex-col gap-6">
      <Modal ref={modalShowRequest}>
        {requestClicked && <ModalShowRequest request={requestClicked} />}
      </Modal>
      <ModalAddPermission
        opened={addPermissionModal}
        setOpened={setAddPermissionModal}
        onSave={onPermissionAdd}
        onCancel={() => setAddPermissionModal(false)}
      />
      <ModalEditPermission 
        opened={editPermissionModal}
        onSave={onBookingEdit}
        onCancel={() => setEditPermissionModal(undefined)}
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
      <DatatableMenu
        title={["Request Leave", "Request Leave"]}
        tableName="Request Leave"
        data={dummyData || []}
        onRowClick={(value) => {
          setRequestClicked(value)
          modalShowRequest.current?.openModal()
        }}
        columns={[
          {
            key: "day",
            label: "Day",
          },
          {
            key: "startDate",
            label: "Date",
          },
          // {
          //   key: "endDate",
          //   label: "End Date",
          // },
          {
            key: "type",
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
        onEdit={handleEditPermission}
        onScrollEnd={loadMore}
      />
    </div>
  );
}
