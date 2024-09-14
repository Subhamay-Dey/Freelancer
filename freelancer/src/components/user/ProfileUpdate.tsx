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
import ImagePreview from '../common/ImagePreview';
import {createClient} from '@/supabase/supabaseClient';
import Env from '@/Env/Env';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function ProfileUpdate({user}:{user:User}) {

    const [authState, setAuthState] = useState({
        name: user.user_metadata?.["name"],
        description: user.user_metadata?.["description"],
        email: user.email,
    })
    const supabase = createClient()
    const [image, setImage] = useState<File | null>(null)
    const imageRef = useRef< HTMLInputElement | null >(null)
    const [previewUrl, setPreviewUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [open , setOpen] = useState(false)
    const router = useRouter()

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
      
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        const payload:ProfilePayloadType = {
          name: authState.name,
          description: authState.description,
        }

        if(image) {
          const path = `/${user.id}/profile`
          const {data, error} = await supabase.storage.from(Env.S3_BUCKET).upload(path, image, {
            upsert:true
          })

          if(error) {
            setLoading(false)
            toast.error("Something went wrong during image upload", {theme: "coloured"})
            return false
          }
          payload.profile_image = data.path
        }

        const {error} = await supabase.auth.updateUser({data:payload})
        if(error) {
          setLoading(false)
          toast.error("Something went wrong during profile update", {theme: "coloured"})
          return false
        }
        setLoading(false)
        toast.success("Profile updated successfully", {theme: "coloured"})
        setOpen(false)
        router.refresh()
      }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <Button variant={'outline'} className='w-full'>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent onInteractOutside={(e) => e.preventDefault()} className='overflow-y-scroll max-h-[80%]'>
        <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
                <Input type='file' id='image' ref={imageRef} onChange={handleImageChange}/>
            </div>
            {previewUrl && <ImagePreview image={previewUrl} callback={removePreview}/>}
            <div className='mt-6'>
                <Button className='w-full' disabled={loading}>{" "}{loading ? "Processing" : "Update Profile"}{" "}</Button>
            </div>
        </form>
        
    </DialogContent>
    </Dialog>

  )
}

export default ProfileUpdate