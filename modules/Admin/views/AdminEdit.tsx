"use client";
import { FormEvent, useEffect, useState } from "react";
import { Button, FileInput, TextInput } from "@mantine/core";
import ButtonBack from "shared/components/buttons/ButtonBack";
import { useInput } from "shared/hooks/form";
import { useRouter } from "next/navigation";
import { PageProps } from "@/shared/contracts/page";
import Compressor from "compressorjs";
import { notifications } from "@mantine/notifications";
import Upload from "@/icons/Upload";
import { AdminInput } from "@/shared/@types";
import { useApiHandler } from "@/shared/hooks";
import { API_editAdmin, API_getAdmin, API_upload } from "@/shared/apis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/providers";
import { setAuth } from "@/shared/providers/authSlice";

export default function AdminEdit({ params }: PageProps<{ id: string }>) {
  const router = useRouter();
  const { input, handleInput, setInput } = useInput<AdminInput>({
    name: "",
    email: "",
    password: undefined,
    thumbnail: undefined,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false)

  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatcher = useDispatch();

  const { data, fetch } = useApiHandler(API_getAdmin, { silence: true })
  const { fetch: fetchEdit, loading: loadingSubmit } = useApiHandler(API_editAdmin, { silence: true })
  const { fetch: fetchUpload } = useApiHandler(API_upload, { silence: false })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetchEdit({
        params: { adminId: params.id },
        data: input,
      });
      if (res) {
        if (String(res.data.data.id) === auth?.id) {
          dispatcher(setAuth({ 
            ...auth, 
            name: res.data.data.name, 
            email: res.data.data.email, 
            thumbnail: res.data.data.thumbnail
          }))
        }
        router.push("/admin");
      }
    } catch(error) {
      console.warn(error);
    }
  };

  const handleUploadThumbnail = (file: File) => {
    setIsUpload(true)
    if (!file) return null;
    setThumbnail(file);

    return new Compressor(file, {
      quality: 0.6,
      convertTypes: "image/webp",
      async success(result) {
        const formData = new FormData();
        formData.append("file", result, result.name);
        try {
          const resultUpload = await fetchUpload({
            data: formData
          });
          // Check if resultUpload is an object
          if (resultUpload && typeof resultUpload === 'object') {
            // Check if the expected properties exist
            if (resultUpload.data && resultUpload.data.fileName) {
              setInput((c: any) => ({
              ...c,
              thumbnail: resultUpload.data.fileName,
            }));
            } else {
              console.log('Required properties missing in resultUpload:', resultUpload);
            }
          } else {
            console.log('Invalid resultUpload:', resultUpload);
          }
        } catch (error) {
          console.warn(error);
          notifications.show({
            title: "Failed",
            message: "Failed upload thumbnail",
          });            
        }
      },
      error(err) {
        return notifications.show({
          title: err.name,
          message: err.message,
        });
      },
    });
  };

  useEffect(() => {
    setInput((p: any) => ({
      ...p,
      ...data,
    }));
  }, [data]);

  useEffect(() => {
    fetch({params: {adminId: params.id}})
      .then()
      .catch((error) => console.warn(error))
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex gap-4 sticky-header">
        <ButtonBack />
        <h1>Update Admin</h1>
      </div>
      <form className="gap-4 md:w-1/2 flex flex-col" onSubmit={handleSubmit}>
        <TextInput
          required
          label="E-mail"
          placeholder="email@gmail.com"
          value={input.email}
          onChange={handleInput("email")}
        />
        <TextInput
          required
          label="Name"
          placeholder="full name"
          value={input.name}
          onChange={handleInput("name")}
        />
        <TextInput
          label="New Password"
          placeholder="new password"
          onChange={handleInput("password")}
        />
        <FileInput
          label="Thumbnail"
          placeholder="Thumbnail"
          accept="image/*"
          id="file"
          leftSection={<Upload className="w-6" />}
          value={thumbnail}
          onChange={(e: File) => {
            handleUploadThumbnail(e);
          }}
        />
        <Button className="hover:bg-red-700 outline" type="submit" loading={loadingSubmit} disabled={isUpload}>
          Simpan
        </Button>
      </form>
    </div>
  );
}
