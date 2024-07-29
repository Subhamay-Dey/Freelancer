"use client"
import React, {useState, useRef} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from '@supabase/supabase-js'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import ImagePreview from '../common/ImagePreview'
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/supabase/supabaseClient'
import Env from '@/Env/Env'
import { toast } from 'react-toastify'
  
function AddPosts({user, children}:{user:User, children:React.ReactNode}) {

  const [open, setOpen] = useState(false)

  const [previewUrl, setPreviewUrl] = useState("")

  const [image, setImage] = useState<File | null>(null)

  const imageRef = useRef< HTMLInputElement | null >(null)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

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

  const removePreview = () => {
    setImage(null)
    if(imageRef.current) {
      imageRef.current.value = ""
    }
    setPreviewUrl("")
  }

  const addPost = async() => {
    setLoading(true)
    const payload:PostPayloadType = {
      content: content,
      user_id: user.id
    }
    if(image) {
      const path = `${user.id}/${uuidv4()}`
      const {data, error} = await supabase.storage.from(Env.S3_BUCKET).upload(path, image)

      if(error) {
        console.log("The image upload error is", error);
        toast.error("Something went wrong while uploading image", {theme:"colored"})
        setLoading(false)
        return
      }
      payload.image = data.path
    }

    // Adding the post to the supabase db.

    const {data, error} = await supabase.from("posts").insert(payload)

    if(error) {
      toast.error("Something went wrong while uploading the post", {theme:"colored"})
      setLoading(false)
      return
    }
    resetState()
    setLoading(false)
    toast.success("Post added successfully", {theme: "colored"})
    setOpen(false)
  }

  const resetState = () => {
    setContent("");
    removePreview();
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
                value={content}
                onChange={(event) => setContent(event.target.value)}
              >
              </textarea>
              {previewUrl && <ImagePreview image={previewUrl} callback={removePreview}/>}
              <div className='flex justify-between items-center mt-2'>
                <input type='file' className='hidden' ref={imageRef} accept='image/png , image/jpg, image/svg, image/jpeg, image/webp, image/gif'
                onChange={handleImageChange}
                />
                <Image size={30} className='cursor-pointer' onClick={handleImageIcon}/>
                <Button size={"sm"} disabled={content.length <= 1 } onClick={addPost}>{loading ? "Processing" : "Post"}</Button>
              </div>
            </div>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddPosts