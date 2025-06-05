import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
export default async function Home() {   

  const supabase = createClient(cookies())
  const {data, error} = await supabase.auth.getSession()

  const {data: posts, error: customErr} = await supabase.rpc("get_posts_with_likes", {request_user_id: data.session?.user.id})
  .order("post_id",{ascending: false})

  return (
    <div>
      
    </div>
  );
}