import { Button } from "@/components/ui/button";
import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {

  const supabase = createClient(cookies())

  const {data, error} = await supabase.auth.getSession()

  return (
    <div>
      <PostCard/>
    </div>
  );
}