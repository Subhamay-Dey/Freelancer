"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export default function ImagePreview({image, callback}:{image:string, callback:() => void} ) {
  return (
    <div className='relative border-2 rounded-xl'>
        <Button variant={'secondary'} size={"icon"} className='absolute top-2 right-2' onClick={callback}>
            <X/>
        </Button>
        <Image src={image} width={10} height={10} className='w-full object-contain' alt='image'/>
    </div>
  )
}
