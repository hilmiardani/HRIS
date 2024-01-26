"use client";
import { FormEvent, useState } from "react";
import { Button, FileInput, TextInput } from "@mantine/core";
import ButtonBack from "shared/components/buttons/ButtonBack";
import { useInput } from "shared/hooks/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import Upload from "@/icons/Upload";
import Compressor from "compressorjs";
import { API_addAdmin, API_upload } from "@/shared/apis";
import { useApiHandler } from "@/shared/hooks";
import { AdminInput } from "@/shared/@types";

export default function AdminCreate() {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState<boolean>(false)

  const { input, handleInput, setInput } = useInput<AdminInput>({
    name: "",
    email: "",
    password: "",
    thumbnail: undefined,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { fetch, loading: loadingSubmit } = useApiHandler(API_addAdmin, { silence: true })
  const { fetch: fetchUpload } = useApiHandler(API_upload, { silence: false })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch({
      data: input,
    });
    if (res) {
      router.push("/admin");
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

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex gap-4 sticky-header">
        <ButtonBack />
        <h1>Tambah Admin Baru</h1>
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
          required
          label="Password"
          placeholder="your password"
          value={input.password}
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
