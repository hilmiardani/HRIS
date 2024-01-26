import Modal, { ModalRef } from '@/shared/components/Modal';
import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import React from 'react'

interface ImageModalProps {
  modalRef: React.RefObject<ModalRef>;
  images: string[];
  title: string;
}

const ImageModal = ({ modalRef, title, images }: ImageModalProps) => {
  return (
    <Modal ref={modalRef}>
    <h1 className="mb-4">{title}</h1>
    <div className="flex md:w-1/2 w-full">
        {
            (images && images.length > 0) && 
            <Carousel slideSize="100%" height={400} loop withIndicators>
                {images?.map((value, index) => (
                <Carousel.Slide key={index}>
                    <Image alt="" src={value} />
                </Carousel.Slide>
                ))}
            </Carousel>
        }
    </div>
    </Modal>
  )
}

export default ImageModal