import React from 'react'
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from './PostCard'

async function Posts({posts}:{posts:PostType[] | []}) {

    const supabase = createClient(cookies())

    const {data, error} = await supabase.auth.getSession()
  return (
    <div>
      {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
              <PostCard post={item} user={data.session?.user!} key={index}/>
            ))}
    </div>
  )
}

export default Posts