"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export default function ImagePreview({image, callback}:{image:string, callback:() => void} ) {
  return (
    <div className='relative border-2 rounded-xl'>
        {/* <Button variant={'secondary'} size={"icon"} className='absolute top-2 right-2' onClick={callback}>
            <X/>
        </Button> */}
        <AlertDialog>
        <AlertDialogTrigger className='absolute top-2 right-2 text-white border rounded-lg bg-slate-300' >
            <X/>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Ready to Delete?</AlertDialogTitle>
            <AlertDialogDescription>
            Do you really want to delete the image?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={callback}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

        <Image src={image} width={10} height={10} className='w-full object-contain' alt='image'/>
    </div>
  )
}
