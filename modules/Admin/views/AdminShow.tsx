"use client";
import ButtonBack from "shared/components/buttons/ButtonBack";
import ButtonEdit from "shared/components/buttons/ButtonEdit";
import ButtonDelete from "shared/components/buttons/ButtonDelete";
import { useRouter } from "next/navigation";
import { PageProps } from "shared/contracts/page";
import CardDetail from "@/shared/components/card/CardDetail";
import { Avatar, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useApiHandler } from "@/shared/hooks";
import { API_deleteAdmin, API_getAdmin } from "@/shared/apis";
import ModalGlobal from "@/shared/components/modal/ModalGlobal";

export default function AdminShow({ params }: PageProps<{ id: string }>) {
  const router = useRouter();
  const [modalConfirm, setModalConfirm] = useState(false);

  const { data, fetch } = useApiHandler(API_getAdmin, {})
  const { fetch: fetchDelete } = useApiHandler(API_deleteAdmin, {})

  const openEditView = () => router.push(`/admin/${params.id}/edit`);

  const deleteAdmin = async () => {
    fetchDelete({ params: { adminId: params.id } })
      .then(() => router.replace("/admin"))
      .catch((error) => console.warn(error))
  }

  const modalDelete = () => (
    <ModalGlobal opened={modalConfirm} title={"Delete"} setOpened={setModalConfirm} onClose={() => setModalConfirm(false)}>
      <div className="flex flex-col gap-4">
        <div>
          <p>Are you sure you want to delete Admin {data?.name}?</p>
        </div>
      </div>
      <div className="flex w-full mt-4 justify-end" >
        <Button className="mr-3" onClick={deleteAdmin}>Yes</Button>
        <Button variant="outline" onClick={() => setModalConfirm(false)}>
          Cancel
        </Button>
      </div>
    </ModalGlobal>
  );

  useEffect(() => {
    fetch({params: {adminId: params.id}})
      .then()
      .catch((error) => console.warn(error))
  }, [])

  return (
    <div className="[ module-detail ] [ flex flex-col ]">
      {modalDelete()}
      <div className="inline-flex gap-4 sticky-header">
        <ButtonBack />
        <h1>Detail Admin</h1>

        <ButtonEdit className="ml-auto" onClick={openEditView} />
        <ButtonDelete onClick={() => setModalConfirm(true)} />
      </div>

      <div className="flex flex-col md:flex-row mt-10">
        <div className="">
          <Avatar
            src={data?.thumbnail ? data.thumbnail : "/avatar.svg"}
            size={150}
            bg="gray"
            radius={100}
          />
        </div>
        <div className="block ml-0 md:ml-4">
          <CardDetail
            data={[
              {
                label: "Name: ",
                value: data?.name,
              },
              {
                label: "E-mail: ",
                value: data?.email,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
