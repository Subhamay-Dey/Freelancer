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
  
function AddComment({user, post, children}:{user:User, post: PostType, children:React.ReactNode}) {

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

  const addComment = async() => {
    setLoading(true)
    const payload:CommentPayloadType = {
      content: content,
      user_id: user.id,
      post_id: post.post_id,
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

    // Adding the Comment to the supabase db.

    const {data, error} = await supabase.from("comments").insert(payload)

    if(error) {
      toast.error("Something went wrong while commenting on the post", {theme:"colored"})
      setLoading(false)
      return
    }

    // Update the reply count in the post table.

    await supabase.rpc("comment_increment",{row_id: post.post_id, count: 1})

    await supabase.from("notification").insert({
        user_id: user.id, 
        post_id: post.post_id, 
        to_user_id: post.user_id, 
        type: 2
    })

    resetState()
    setLoading(false)
    toast.success("Comment added successfully", {theme: "colored"})
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
            <DialogTitle>Add Comment</DialogTitle>
            </DialogHeader>
            <div>
              <textarea 
                className='bg-muted w-full outline-none rounded-lg h-32 p-2 border' placeholder='Add your comment...'
                value={content}
                onChange={(event) => setContent(event.target.value)}
              >
              </textarea>
              {previewUrl && <ImagePreview image={previewUrl} callback={removePreview}/>}
              <div className='flex justify-between items-center mt-2'>
                <input type='file' className='hidden' alt='file' ref={imageRef} accept='image/png , image/jpg, image/svg, image/jpeg, image/webp, image/gif'
                onChange={handleImageChange}
                />
                <Image size={30} className='cursor-pointer' onClick={handleImageIcon} aria-label="Upload image"/>
                <Button size={"sm"} disabled={content.length <= 1 } onClick={addComment}>{loading ? "Processing" : "Comment"}</Button>
              </div>
            </div>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddComment