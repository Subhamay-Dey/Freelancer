import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {   

  const supabase = createClient(cookies())
  const {data} = await supabase.auth.getSession()

  const {data: posts, error} = await supabase.rpc("get_posts_with_likes", {request_user_id: data.session?.user.id})

    console.log("The custom posts", posts);
    console.log("The error is", error);

  return (
    <div>
      {posts && posts.length > 0 && posts.map((item: PostType, index: number) => (
        <PostCard post={item} key={index}/>
      ))}
    </div>
  );
}