"use client"

import React, { useEffect, useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Bookmark, MessageCircle, MoreVertical, Send } from 'lucide-react'
import { formatDate, getS3Url } from '@/helpers/helper'
import PostLike from './PostLike'
import AddComment from '../comments/AddComment'
import { User } from '@supabase/supabase-js'
import ImageViewModal from '../common/ImageViewModal'
import Link from 'next/link'
import PostMoreOptions from './PostMoreOptions'
import { useRouter } from 'next/navigation'
import { createClient } from '@/supabase/supabaseClient'

function PostCard({post, user}: {post: PostType, user:User | any}) {

  const router = useRouter();
  const supabase = createClient();

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setLoggedInUser(data?.session?.user?.id || null);
    };
    fetchSession();
  }, []);

  const navigateUser = () => {
    if(post.user_id === loggedInUser) {
      router.push("/profile");
    } else {
      router.push(`/user/${post.user_id}`);
    }
  }

  return (
    <div className='mt-4 bg-muted rounded-xl'>
      <div className='flex justify-between items-center p-2'>
        <div className='flex space-x-2 cursor-pointer' onClick={() => navigateUser()}>
          <UserAvatar 
            name={post.name} 
            image={post.profile_image ? getS3Url(post.profile_image) : ""}
            />
          <div className='flex flex-col'>
            <p className='text-lg font-bold'>{post.name}</p>
            <p className='text-sm'>{formatDate(post.created_at)}</p>
          </div>
        </div>
        <PostMoreOptions userId={user.id} post={post}/>
      </div>

      { post.image && (<ImageViewModal image={post.image}/>)}

      <Link href={`/post/${post.post_id}`}>
        <p className='mt-1 p-2'>{post.content}</p>
      </Link>

      <div className='flex justify-between items-center mt-4 px-4 py-2
      '>
        <div className='flex space-x-4'>
          <PostLike post={post} UserId={post.user_id}/>
          <AddComment user={user} post={post}>
            <MessageCircle className='cursor-pointer'/>
          </AddComment>
          <Send className='cursor-pointer'/>
        </div>
        <Bookmark className='cursor-pointer'/>
      </div>

      <div className='flex space-x-4 p-2'>
        <p className='select-none'>Likes {post.likes_count}</p>
        <p className='select-none'>Replies {post.reply_count}</p>
      </div>

    </div>
  )
}

export default PostCard