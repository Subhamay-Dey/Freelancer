import React from 'react'
import { createClient } from '@/supabase/supabaseServer'
import { cookies } from 'next/headers'
import UserAvatar from '@/components/common/UserAvatar'
import { getS3Url } from '@/helpers/helper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from '@/components/posts/PostCard'
import CommentCard from '@/components/comments/CommentCard'

async function User({params}:{params:{id:string}}) {

    const supabase = createClient(cookies())

    const {data:user, error} = await supabase
    .from("users")
    .select("id, name, username, email, profile_image, metadata")
    .eq("id", params.id).single()

    const {data: posts} = await supabase.rpc("get_posts_with_likes", {
      request_user_id: params.id
    })
    .eq("user_id", params.id)
    .order("post_id", {ascending: false})

    const {data: commentdata} = await supabase
    .from("comments")
    .select("id, user_id, post_id, content, image, created_at, users(id, name, username, profile_image)")
    .eq("user_id", params.id)

  return (
    <div>
        <div className='flex justify-between items-center'>
          <div>
              <p className='text-2xl font-bold'>{user?.name}</p>
              <p className='font-bold'>@{user?.username}</p>
          </div>
          <UserAvatar
          name={user?.name} 
          width={5} 
          height={5} 
          image={user?.profile_image
          ? getS3Url(user?.profile_image)
          : ""
          }/>
      </div>

      <p className='mt-4'>{user?.metadata?.["description"]}</p>

      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className='w-full grid grid-cols-2'>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
            <PostCard post={item} user={user as UserType} key={index}/>
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

export default User