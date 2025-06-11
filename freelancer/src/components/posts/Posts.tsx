"use client"

import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { User } from '@supabase/supabase-js';
import { createClient } from '@/supabase/supabaseClient';
import Loading from '@/app/(front)/loading';
import { useInView } from 'react-intersection-observer';

function Posts({user, data, postsCount}:{user: User ,data:PostType[] | [], postsCount: number}) {

  const supabase = createClient()

  const [posts, setPosts] = useState(data)

  const {ref, inView} = useInView({threshold: 0})

  useEffect(() => {
    console.log(inView, "The in view is here");
  },[inView])

  useEffect(() => {

    const channel = supabase.channel("postsChannel")

    channel.on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "posts",
    }, async (payload) => {

      console.log("The post payload is!", payload);

      const {data: postUser, error} = await supabase
      .from("users")
      .select("id, name, username, email, profile_image")
      .eq("id", payload.new?.user_id)
      .single()

      console.log("The post user is", postUser);
      console.log("The error is", error)

      const data:PostType = {
        post_id: payload.new?.id,
        user_id: payload.new?.user_id,
        content: payload.new?.content,
        image: payload.new?.image,
        likes_count: payload.new?.likes_count,
        reply_count: payload.new?.reply_count,
        created_at: payload.new?.created_at,
        liked: false,
        name: postUser?.name,
        username: postUser?.username,
        email: postUser?.email,
        profile_image: postUser?.profile_image
      }
      setPosts([data, ...posts])
    })
    .subscribe()

    return () => {
      channel.unsubscribe()
    }

  }, [])

  return (
    <div>
      {data && data.length > 0 && data.map((item: PostType,index: number) => (
        <PostCard post={item} user={user} key={index}/>
      ))}

      <div className='flex justify-center' ref={ref}>
        <Loading/>
      </div>
    </div>
  )
}

export default Posts