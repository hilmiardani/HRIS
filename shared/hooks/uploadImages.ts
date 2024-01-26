import React, { useState } from 'react'
import { useApiHandler } from './useApiHandler'
import { API_upload } from '../apis'
import { notifications } from '@mantine/notifications'
import { tmpImage } from '../@types'
import Compressor from 'compressorjs'

export const useUploadImages = () => {
  const { fetch: fetchUpload } = useApiHandler(API_upload, { silence: true })
  const [images, setImages] = useState<tmpImage[]>([])
  const handleUpload = (file: File[]) => {
    if (file.length == 0) {
      return null;
    }
    for (let index = 0; index < file.length; index++) {
      new Compressor(file[index], {
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
                setImages(prev => ([...prev, {
                  fileName: resultUpload.data.fileName,
                  image: URL.createObjectURL(result)
                }]))
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
              message: "Failed upload images",
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
  };

  return { images, setImages, handleUpload }
}
