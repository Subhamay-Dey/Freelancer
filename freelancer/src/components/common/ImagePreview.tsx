"use client"
import Image from 'next/image'
import React from 'react'

export default function ImagePreview({image}:{image:string} ) {
  return (
    <div className='relative border-2 rounded-xl'>
        <Image src={image} width={10} height={10} className='w-full object-contain' alt='image'/>
    </div>
  )
}
