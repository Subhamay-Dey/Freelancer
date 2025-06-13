"use client"

import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { User } from '@supabase/supabase-js';
import { createClient } from '@/supabase/supabaseClient';
import Loading from '@/app/(front)/loading';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

function Posts({user, data, postsCount}:{user: User ,data:PostType[] | [], postsCount: number}) {

  const supabase = createClient()

  const [posts, setPosts] = useState(data)
  const [page, setPage] = useState(1);
  const postLimit = 5

  const {ref, inView} = useInView({threshold: 0})

  useEffect(() => {
    console.log(inView, "The in view is here");
  },[inView])

  const fetchMorePosts = async() => {
    let from = page * postLimit;
    let to = from + postLimit;

    if(from > postsCount) {
      return false;
    }

    const {data: posts, error: CustomError} = await supabase
      .rpc("get_posts_with_likes", {request_user_id: user.id},)
      .order("post_id",{ascending: false})
      .range(from, to);

      if(CustomError) {
        toast.error("Something went wrong while fetching more posts!")
        return;
      }

      setPage(page + 1)
  }

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