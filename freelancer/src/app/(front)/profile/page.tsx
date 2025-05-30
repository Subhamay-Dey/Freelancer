import UserAvatar from '@/components/common/UserAvatar'
import React from 'react'

import {createClient} from "@/supabase/supabaseServer"
import {cookies} from "next/headers"
import { User } from '@supabase/supabase-js'
import ProfileUpdate from '@/components/user/ProfileUpdate'
import { getS3Url } from '@/helpers/helper'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from '@/components/posts/PostCard'
import CommentCard from '@/components/comments/CommentCard'

async function Profile() {
  const supabase = createClient(cookies())
  const {data} = await supabase.auth.getSession()
  const user:User = data.session?.user!

  const {data: posts} = await supabase.rpc("get_posts_with_likes", {
    request_user_id: data.session?.user.id
  })
  .eq("user_id", user.id)
  .order("post_id", {ascending: false})

  const {data: commentdata} = await supabase
  .from("comments")
  .select("id, user_id, post_id, content, image, created_at, users(id, name, username, profile_image)")
  .eq("user_id", user.id)

  return (
    <div>
      <div className='flex justify-between items-center'>
          <div>
              <p className='text-2xl font-bold'>{user?.user_metadata?.["name"]}</p>
              <p className='font-bold'>@{user?.user_metadata?.["username"]}</p>
          </div>
          <UserAvatar 
          name={user.user_metadata?.["name"]} 
          width={5} 
          height={5} 
          image={user.user_metadata?.["profile_image"] 
          ? getS3Url(user.user_metadata?.["profile_image"])
          : ""
          }/>
      </div>

      <p className='mt-4'>{user.user_metadata?.["description"]}</p>

      <div className='mt-4'>
        <ProfileUpdate user={user}/>
      </div>

      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className='w-full grid grid-cols-2'>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
            <PostCard post={item} user={user} key={index}/>
          ))}
        </TabsContent>
        <TabsContent value="comments">
          {commentdata && commentdata.length > 0 && 
            commentdata?.map((item, index) => <CommentCard comment={item} key={index}/> )}
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Profile