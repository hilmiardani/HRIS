"use client";

import DatatableHeader from "shared/components/datatable/DatatableHeader";
import { useRouter } from "next/navigation";
import Datatable from "shared/components/datatable/Datatable";
import { Admin } from "@/shared/@types";
import { useApiHandler } from "@/shared/hooks";
import { API_getAllAdmin } from "@/shared/apis";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { deepClone } from "@/shared/utils";
import { TextInput } from "@mantine/core";
import Modal, { ModalRef } from "@/shared/components/Modal";
import ModalShowAdmin from "../components/ModalShowAdmin";
import DatatableMenu from "@/shared/components/datatable/DataTableMenu";

export default function AdminList() {
  const router = useRouter();
  const { data, fetch, loadMore, setInput, input } = useApiHandler(API_getAllAdmin, { silence: false, eager: true })

  const [adminClicked, setAdminClicked] = useState<Admin>()
  const openCreateView = () => router.push("/admin/create");
  const openShowView = (admin: Admin) => router.push(`/admin/${admin.id}`);

  const modalShowAdmin = useRef<ModalRef>(null);

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
        name: 'Gus Abdoel Majid S.Pd M.Mk',
        jobTitle: 'SENIOR KJHL NI BOS',
        email: 'abdoelganteng@kjhl.ac.id',
        phone: '+62 896 0820 7601'
    },
    {
        id: '2',
        name: 'Raymond',
        jobTitle: 'Support Senior',
        email: 'raymond@devs.com',
        phone: '+62 896 0820 7601'
    },
    {
        id: '3',
        name: 'Hilmi',
        jobTitle: 'Support Senior',
        email: 'hilmi@devs.com',
        phone: '+62 896 0820 7601'
    },
    {
        id: '4',
        name: 'Tio',
        jobTitle: 'Support Senior',
        email: 'tio@devs.com',
        phone: '+62 896 0820 7601'
    },
    {
        id: '5',
        name: 'Akhmad',
        jobTitle: 'Support Senior',
        email: 'akhmad@devs.com',
        phone: '+62 896 0820 7601'
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <Modal ref={modalShowAdmin}>
        {adminClicked && <ModalShowAdmin admin={adminClicked} />}
      </Modal>
      <DatatableHeader 
        title="Admin" 
        onCreate={openCreateView}
        leftSection={
          <TextInput 
            className="w-full"
            placeholder="Search Admin..."
            value={input?.query?.search || ""} 
            onChange={(e) => onChangeSearch(e)}
          />
        }
      />
      <DatatableMenu
        title={["Admin", "Admin"]}
        tableName="Admin"
        data={dummyData || []}
        onRowClick={(value) => {
          setAdminClicked(value)
          modalShowAdmin.current?.openModal()
        }}
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
            key: "email",
            label: "E-mail",
          },
          {
            key: "phone",
            label: "Phone",
          },
        ]}
        onScrollEnd={loadMore}
      />
    </div>
  );
}
