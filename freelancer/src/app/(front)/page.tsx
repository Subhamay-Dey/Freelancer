import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import Posts from "@/components/posts/Posts";
export default async function Home() {   

  const supabase = createClient(cookies())
  const {data, error} = await supabase.auth.getSession()

  const {data: posts, error: customErr, count} = await supabase
      .rpc("get_posts_with_likes", {request_user_id: data.session?.user.id}, {count: "exact"})
      .order("post_id",{ascending: false})
      .range(0, 4);

  return (
    <div>
      {posts && posts.length > 0 && (
        <Posts data={posts} user={data?.session?.user!} postsCount={count ?? 0}/>
      )}
    </div>
  );
}