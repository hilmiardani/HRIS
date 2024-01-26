"use client";

import Edit from "@/icons/Edit";
import Upload from "@/icons/Upload";
import { Avatar, Button, FileInput, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import Compressor from "compressorjs";
import { ProfileUpdate } from "@/shared/@types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/providers";
import { setAuth } from "@/shared/providers/authSlice";
import { useApiHandler } from "@/shared/hooks";
import { API_editAdmin, API_getAdmin, API_upload } from "@/shared/apis";

const ProfileShow = () => {
  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatcher = useDispatch()

  const [modalForm, setModalForm] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileUpdate>({
    name: "",
    email: "",
    password: undefined,
    confirmPassword: undefined,
    thumbnail: undefined,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const adminIdRef = useRef<string>()

  const { data, fetch, loading } = useApiHandler(API_getAdmin, { silence: true })
  const { fetch: fetchEdit } = useApiHandler(API_editAdmin, { silence: true })
  const { fetch: fetchUpload } = useApiHandler(API_upload, { silence: true })

  const handleSubmit = async () => {
    if (profile.password !== profile.confirmPassword) {
      return notifications.show({
        message: "Passwords did not match",
      });
    }

    if (auth?.id !== undefined) {
      const res = await fetchEdit({
        params: { adminId: auth?.id },
        data: profile,
      })
      if (res) {
        setModalForm(false);
        dispatcher(setAuth({
          ...auth,
          name: res.data.data.name,
          email: res.data.data.email,
          thumbnail: res.data.data.thumbnail
        }))
        setProfile((c) => ({ ...c, thumbnail: undefined }));
        setThumbnail(null)
      }
    }
  };

  const handleUploadThumbnail = (file: File) => {
    if (!file) return null
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
              setProfile((c) => ({ ...c, thumbnail: resultUpload.data.fileName, }));
              // const result = await API_StreamTMP(`${resultUpload.data.fileName}`)
              // setPreviewThumbnail(result)
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
    setProfile((p) => ({
      ...p,
      ...data,
    }));
  }, [data]);

  useEffect(() => {
    if (!loading && auth?.id !== undefined && adminIdRef.current !== auth.id)
      fetch({ params: { adminId: auth?.id } })
        .then(() => adminIdRef.current = auth?.id)
        .catch((error) => console.warn(error))
  }, [loading]);

  return (
    <>
      <Modal opened={modalForm} onClose={() => setModalForm(false)} title="Update Profile">
        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Name"
            label="Name"
            value={profile?.name}
            onChange={(e) => setProfile((c) => ({ ...c, name: e.target.value }))}
          />
          <TextInput
            placeholder="email@mail.com"
            type="email"
            label="Email"
            value={profile?.email}
            onChange={(e) => setProfile((c) => ({ ...c, email: e.target.value }))}
          />
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <PasswordInput
                placeholder="Password"
                label="Password"
                onChange={(e) => setProfile((c) => ({ ...c, password: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <PasswordInput
                placeholder="Confirm Password"
                label="Confirm Password"
                onChange={(e) => setProfile((c) => ({ ...c, confirmPassword: e.target.value }))}
              />
            </div>
          </div>
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
          <div className="flex w-full justify-between">
            <div className="flex">
              <Button size="xs" onClick={() => handleSubmit()}>
                Save
              </Button>
            </div>
            <div className="flex">
              <Button size="xs" variant="outline" onClick={() => setModalForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-end ">
          <Edit />{" "}
          <span className="text-gray-500 cursor-pointer" onClick={() => setModalForm(true)}>
            Update
          </span>
        </div>
        <div className="flex fle-row">
          <div className="flex flex-col w-56 gap-4 items-center">
            <Avatar
              src={auth?.thumbnail ? auth?.thumbnail : "avatar.png"}
              alt="it's me"
              size={120}
              radius={100}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1>{auth?.name}</h1>
            <div className="flex gap-2">
              <span>Email:</span>
              <span>{auth?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileShow;
