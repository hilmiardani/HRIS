import React, { useState } from 'react'
import { tmpImage } from '../@types';
import Compressor from 'compressorjs';
import { notifications } from '@mantine/notifications';
import { useApiHandler } from './useApiHandler';
import { API_upload } from '../apis';

export const useUploadThumbnail = () => {

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
  return { thumbnail, setThumbnail, handleUpload }


}