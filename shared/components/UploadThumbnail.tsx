"use client";

import { FileInput, Grid, Image } from '@mantine/core'
import React, { useRef, useState } from 'react'
import Modal, { ModalRef } from './Modal';
import Upload from '@/icons/Upload';
import { tmpImage } from '../@types';
import { useApiHandler } from '../hooks';
import { API_upload } from '../apis';
import { notifications } from '@mantine/notifications';
import Compressor from 'compressorjs';

interface Ithumbnail {
  propsThumbnail?: string,
  label?: string,
  placeholder?: string,
  callbackThumbnail: ({ fileName, image }: tmpImage) => void
}
const UploadThumbnail = ({ propsThumbnail, callbackThumbnail, label, placeholder }: Ithumbnail) => {
  const modalPreview = useRef<ModalRef>(null);
  const [inputThumbnail, setInputThumbnail] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<tmpImage>();
  const { fetch: fetchUpload } = useApiHandler(API_upload, { silence: false })

  const handleUpload = (file: File) => {
    if (!file) {
      return null;
    }
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
              setThumbnail({
                fileName: resultUpload.data.fileName,
                image: URL.createObjectURL(result)
              })
              callbackThumbnail({
                fileName: resultUpload.data.fileName,
                image: URL.createObjectURL(result)
              })
              setInputThumbnail(file)
            } else {
              notifications.show({
                title: "Failed",
                message: `Required properties missing in resultUpload: ${resultUpload}`,
              });
            }
          } else {
            notifications.show({
              title: "Failed",
              message: `Invalid resultUpload: ${resultUpload}`,
            });
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
  }
  return (
    <>
      <Modal ref={modalPreview}>
        <Image src={thumbnail ? thumbnail.image : propsThumbnail} className="w-full flex" />
      </Modal>

      <FileInput
        label={label ? label : "Thumbnail"}
        placeholder={placeholder ? placeholder : "Thumbnail"}
        accept="image/*"
        id="file"
        leftSection={<Upload className="w-6" />}
        value={inputThumbnail}
        onChange={(e: File) => {
          handleUpload(e);
        }}
      />
      {(thumbnail ? thumbnail : propsThumbnail) && (
        <div className='cursor-pointer w-full mt-4 justify-center' onClick={() => modalPreview.current?.openModal()}>
          <Image src={thumbnail ? thumbnail.image : propsThumbnail} h="auto" w="100%" fit="cover" radius={'md'} />
        </div>
      )}
    </>
  )
}

export default UploadThumbnail