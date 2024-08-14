import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { getS3Url } from '@/helpers/helper'

function ImageViewModal({image}: {image: string}) {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Image 
        src={getS3Url(image)} 
        width={10} 
        height={10} 
        alt='post_image' 
        className='w-full object-contain rounded-lg select-none mt-2 cursor-pointer' 
        unoptimized/>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle className='mb-2'>Image View</DialogTitle>
            <Image 
            src={getS3Url(image)} 
            width={10} 
            height={10} 
            alt='post_image' 
            className='w-full h-full object-contain rounded-xl select-none' 
            unoptimized/>
        </DialogHeader>
    </DialogContent>
    </Dialog>

  )
}

export default ImageViewModal