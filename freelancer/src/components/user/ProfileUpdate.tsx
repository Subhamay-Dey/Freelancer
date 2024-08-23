"use client";
import React, { useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '../ui/button';
import { User } from '@supabase/supabase-js';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Image from 'next/image';

function ProfileUpdate({user}:{user:User}) {

    const [authState, setAuthState] = useState({
        name: user.user_metadata?.["name"],
        description: user.user_metadata?.["description"],
        email: user.email,
    })

    const [image, setImage] = useState<File | null>(null)

    const imageRef = useRef< HTMLInputElement | null >(null)
    const [previewUrl, setPreviewUrl] = useState("")

    const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if(selectedFile) {
          setImage(selectedFile)
          const imageUrl = URL.createObjectURL(selectedFile)
          setPreviewUrl(imageUrl)
        }
      }

      const removePreview = () => {
        setImage(null)
        if(imageRef.current) {
          imageRef.current.value = ""
        }
        setPreviewUrl("")
      }

  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button variant={'outline'} className='w-full'>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form>
            <div className='mb-4 space-y-2'>
                <Label htmlFor='name' >Name</Label>
                <Input id='name' value={authState.name} placeholder='Enter your name' onChange={(e) => setAuthState({...authState, name:e?.target.value})}></Input>
            </div>
            <div className='mb-4 space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' value={authState.email} readOnly></Input>
            </div>
            <div className='mb-4 space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id="description" value={authState.description} placeholder='Enter the bio' onChange={(e) => setAuthState({...authState, description: e.target.value})}></Textarea>
            </div>
            <div className='mb-4 space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image'/>
            </div>
            <div className='mt-6'>
                <Button className='w-full'>Update Profile</Button>
            </div>
        </form>
        
    </DialogContent>
    </Dialog>

  )
}

export default ProfileUpdate