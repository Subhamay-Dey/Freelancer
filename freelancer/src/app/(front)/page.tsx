import { Button } from "@/components/ui/button";
import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {

  const supabase = createClient(cookies())

  const {data, error} = await supabase.auth.getSession()

  const {data:posts, error:PostErr} = await supabase.from("posts").select("id, content, image, likes_count, reply_count, created_at, users(id, name, username, profile_image)");

  console.log("The posts are", posts);
  console.log("The error is", PostErr);
  
  return (
    <div>
      <PostCard/>
    </div>
  );
}