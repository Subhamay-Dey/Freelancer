import { formatDate, getS3Url } from '@/helpers/helper'
import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { MoreVertical } from 'lucide-react'
import ImageViewModal from '../common/ImageViewModal'

function CommentCard({comment}: {comment: CommentType}) {
  return (
    <div className='mt-4 bg-muted rounded-xl'>
      <div className='flex justify-between items-center p-2'>
        <div className='flex space-x-2'>
          <UserAvatar 
            name={comment.users?.name} 
            image={comment?.users?.profile_image ? getS3Url(comment?.users?.profile_image) : ""}
            />
          <div className='flex flex-col'>
            <p className='text-lg font-bold'>{comment.users?.name}</p>
            <p className='text-sm'>{formatDate(comment.created_at)}</p>
          </div>
        </div>
        <MoreVertical/>
      </div>

      { comment.image && (<ImageViewModal image={comment.image}/>)}


        <p className='mt-1 p-2'>{comment.content}</p>

    </div>
  )
}

export default CommentCard