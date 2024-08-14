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
        .single();

    const {data: commentdata, error: commenterror} = await supabase
      .from("comments")
      .select("id, user_id, post_id, content, image, created_at, users(id, name, username, profile_image)")
      .eq("post_id", params.id)

      console.log("The comment data", commentdata);
      
    
  return (
    <div>
        <PostCard user={data.session?.user!} post={post as PostType}/>
    </div>
  )
}

export default ShowPost