"use client"

import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { Bookmark, Heart, MessageCircle, MoreVertical, Send } from 'lucide-react'
import Image from 'next/image'
import { formatDate, getS3Url } from '@/helpers/helper'

function PostCard({post}: {post: PostType}) {
  return (
    <div className='mt-4 bg-muted rounded-xl'>
      <div className='flex justify-between items-center p-2'>
        <div className='flex space-x-2'>
          <UserAvatar 
            name={post.users?.name} 
            image={post.users?.profile_image ? getS3Url(post.users?.profile_image) : ""}
            />
          <div className='flex flex-col'>
            <p className='text-lg font-bold'>{post.users?.name}</p>
            <p className='text-sm'>{formatDate(post.created_at)}</p>
          </div>
        </div>
        <MoreVertical/>
      </div>

      { post.image && (
        <Image 
          src={getS3Url(post.image)} 
          width={10} 
          height={10} 
          alt='post_image' 
          className='w-full object-contain rounded-lg mt-2' 
          unoptimized/>
        )}

      <p className='mt-1 p-2'>{post.content}</p>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex space-x-4 p-2'>
          <Heart/>
          <MessageCircle/>
          <Send/>
        </div>
        <Bookmark/>
      </div>

      <div className='flex space-x-4 p-2'>
        <p>Likes {post.likes_count}</p>
        <p>Replies {post.reply_count}</p>
      </div>

    </div>
  )
}

export default PostCard