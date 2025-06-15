"use client"

import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { User } from '@supabase/supabase-js';
import { createClient } from '@/supabase/supabaseClient';
import Loading from '@/app/(front)/loading';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

function Posts({data, user, totalPosts}:{user: User ,data:Array<PostType> | [], totalPosts: number}) {

  const supabase = createClient()

  const [posts, setPosts] = useState(data)
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false)
  const limit = 5

  const {ref, inView} = useInView({threshold: 0})

  useEffect(() => {
    if(inView) {
      fetchMorePosts()
    }
  },[inView])

  const fetchMorePosts = async() => {
    let from = page * limit;
    let to = from + limit;

    if(from > totalPosts) {
      setNoMoreData(true)
      return false;
    }

    const {data, error} = await supabase
      .rpc("get_posts_with_likes", {request_user_id: user.id},)
      .order("post_id",{ascending: false})
      .range(from, to);

      setPage(page + 1)

      if(error) {
        toast.error("Something went wrong while fetching more posts!")
        return
      }

      const morePosts: Array<PostType> | [] = data;
      if(morePosts && morePosts.length > 0) {
        setPosts([...posts, ...morePosts]);
      } else {
        setNoMoreData(true);
      }
  }

  useEffect(() => {

    const channel = supabase.channel("postsChannel")

    channel
    .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("The delete payload is", payload);
          const filterPosts = posts.filter(
            (item) => item.post_id !== payload.old?.id
          );
          setPosts(filterPosts);
        }
      )
    .on("postgres_changes", {
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
      {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
        <PostCard post={item} user={user} key={index}/>
      ))}

      {!noMoreData && <div className='flex justify-center mt-2' ref={ref}>
        <Loading/>
      </div>}

      {noMoreData && <div className='text-center text-gray-500 my-4'>No more posts to show!</div>}
    </div>
  )
}

export default Posts