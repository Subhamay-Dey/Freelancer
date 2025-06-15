import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react'

function PostMoreOptions({userId, post}: {userId: string, post: PostType}) {

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Info</DropdownMenuItem>
                {userId === post.user_id && (<DropdownMenuItem>Delete</DropdownMenuItem>)}
                
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default PostMoreOptions