"use client"
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from '@supabase/supabase-js'
  
function AddPosts({user, children}:{user:User, children:React.ReactNode}) {

  const [open, setOpen] = useState(false)

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddPosts