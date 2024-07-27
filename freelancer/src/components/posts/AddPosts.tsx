"use client"
import React, {useState, useRef} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from '@supabase/supabase-js'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import ImagePreview from '../common/ImagePreview'
  
function AddPosts({user, children}:{user:User, children:React.ReactNode}) {

  const [open, setOpen] = useState(false)

  const [previewUrl, setPreviewUrl] = useState("")

  const [image, setImage] = useState<File | null>(null)

  const imageRef = useRef< HTMLInputElement | null >(null)

  const handleImageIcon = () => {
    imageRef.current?.click()
  }

  const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if(selectedFile) {
      setImage(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(imageUrl)
    }
  }

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
            <DialogTitle>Add Post</DialogTitle>
            </DialogHeader>
            <div>
              <textarea 
                className='bg-muted w-full outline-none rounded-lg h-32 p-2 border' placeholder='Add your thoughts...'
              >
              </textarea>
              {previewUrl && <ImagePreview image={previewUrl}/>}
              <div className='flex justify-between items-center mt-2'>
                <input type='file' className='hidden' ref={imageRef} accept='image/png , image/jpg, image/svg, image/jpeg, image/webp, image/gif'
                onChange={handleImageChange}
                />
                <Image size={30} className='cursor-pointer' onClick={handleImageIcon}/>
                <Button size={"sm"}>Post</Button>
              </div>
            </div>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddPosts