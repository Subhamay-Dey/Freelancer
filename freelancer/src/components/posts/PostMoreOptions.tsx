"use client"

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { createClient } from '@/supabase/supabaseClient'
import { useRouter } from 'next/navigation'

function PostMoreOptions({userId, post}: {userId: string, post: PostType}) {

    const [open, setOpen] = useState(false);
    const supabase = createClient()
    const router = useRouter()

    const deletePost = async() => {
        await supabase.from("posts").delete().eq('id', post.post_id)
        setOpen(false);
    }

    const PostInfo = async() => {
        router.push(`/post/${post.post_id}`)
    }

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-none">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove {"it's"} data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={deletePost}>
              Yes Delete it!
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={PostInfo}>Info</DropdownMenuItem>
                {userId === post.user_id && (<DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default PostMoreOptions