"use client"

import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { Bookmark, Heart, MessageCircle, MoreVertical, Send } from 'lucide-react'
import Image from 'next/image'

function PostCard() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex space-x-2'>
          <UserAvatar name='Subho'/>
          <div className='flex flex-col'>
            <p className='text-lg font-bold'>Subho</p>
            <p className='text-sm'>An hour ago</p>
          </div>
        </div>
        <MoreVertical/>
      </div>

      <Image src="https://kwrzjcvsmhefihoxtrjy.supabase.co/storage/v1/object/public/freelancers/d31d9543-1754-42a5-8819-5d568f02955f/2c4cdd5d-190c-4d9e-93e4-52a84552c2e0" width={10} height={10} alt='post_image' className='w-full object-contain rounded-lg mt-2' unoptimized/>

      <p className='mt-1'>Hey, this is my post</p>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex space-x-4'>
          <Heart/>
          <MessageCircle/>
          <Send/>
        </div>
        <Bookmark/>
      </div>

      <div className='flex space-x-4 p-2'>
        <p>Likes 0</p>
        <p>Replies 0</p>
      </div>

    </div>
  )
}

export default PostCard