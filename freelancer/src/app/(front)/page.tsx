import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {   

  const supabase = createClient(cookies())
  const {data, error} = await supabase.auth.getSession()

  const {data: posts, error: customErr} = await supabase.rpc("get_posts_with_likes", {request_user_id: data.session?.user.id})
  .order("post_id",{ascending: false})

  return (
    <div>
      {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
        <PostCard post={item} user={data.session?.user!} key={index}/>
      ))}
    </div>
  );
}