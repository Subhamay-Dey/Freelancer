import React from 'react'
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from './PostCard'
import { User } from '@supabase/supabase-js';

async function Posts({user, posts}:{user: User ,posts:PostType[] | []}) {
  return (
    <div>
      {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
        <PostCard post={item} user={user} key={index}/>
      ))}
    </div>
  )
}

export default Posts