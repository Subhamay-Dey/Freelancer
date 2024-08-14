import React from 'react'

import { createClient } from '@/supabase/supabaseServer';
import { cookies } from 'next/headers';
import PostCard from '@/components/posts/PostCard';

async function ShowPost({params}:{params: {id: number}}) {

    const supabase = createClient(cookies())
    const {data} = await supabase.auth.getSession();

    const {data:post, error: error} = await supabase
        .rpc("get_posts_with_likes", {request_user_id: data.session?.user?.id})
        .eq("post_id", params?.id)
        .single()

    console.log("The post is:" , post);
    console.log("The error is:", error);
    
    
  return (
    <div>
        <PostCard user={data.session?.user!} post={post as PostType}/>
    </div>
  )
}

export default ShowPost