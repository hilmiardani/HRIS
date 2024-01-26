import React, { useRef, useState } from 'react'
import Modal, { ModalRef } from './Modal'
import { Button, FileInput, Grid, Image } from '@mantine/core'
import Upload from '@/icons/Upload';
import Trash from '@/icons/Trash';
import { useUploadImages } from '../hooks/uploadImages';

const UploadImages = () => {
  const modalImages = useRef<ModalRef>(null);
  const [inputImages, setInputImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string>()
  const { images, setImages, handleUpload: handleUploadImages } = useUploadImages()
  const [stringFile, setStringFile] = useState('')
  const modalDeleteImage = useRef<ModalRef>(null);

  const clickDeleteImage = (fileName: string) => {
    setStringFile(fileName)
    modalDeleteImage.current?.openModal()
  }

  const deleteImage = () => {
    if (images) {
      let filterImage = images.filter((e, i) => e.fileName !== stringFile);
      setImages(filterImage)
      modalDeleteImage.current?.closeModal()
    }
  }

  return (
    <>
      <Modal ref={modalImages}>
        <Image src={previewImage} className="w-full flex" />
      </Modal>
      <Modal ref={modalDeleteImage}>
        <div className="flex flex-col gap-4">
          <div>
            <p>Anda akan menghapus image {stringFile}?</p>
          </div>
        </div>
        <div className="flex w-full mt-4 justify-end" >
          <Button className="mr-3" onClick={deleteImage}>Yes</Button>
          <Button variant="outline" onClick={() => modalDeleteImage.current?.closeModal()}>
            Cancel
          </Button>
        </div>
      </Modal>

      <FileInput
        multiple
        value={inputImages}
        onChange={(e: File[]) => {
          handleUploadImages(e)
          setInputImages(e)
        }}
        leftSection={<Upload className="w-6" />}
        label="Images"
        placeholder="Images"
        accept="image/*"
      />
      {images && (
        <Grid gutter={10} className="mt-4">
          {images.map((item, index) => (
            <Grid.Col span={{ sm: 12, md: 4 }} key={index}>
              <div className="relative w-full h-24 cursor-pointer justify-center items-center flex border rounded-md border-secondary overflow-hidden"
              >
                <div className="absolute top-0 right-0 z-10 cursor-pointer" onClick={() => clickDeleteImage(item.fileName)}>
                  <Trash className="w-5" color="#ff0000" />
                </div>
                <Image className="w-full object-cover" src={item.image} onClick={(e) => {
                  setPreviewImage(item.image)
                  modalImages.current?.openModal()
                }} />
              </div>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  )
}

export default UploadImages
