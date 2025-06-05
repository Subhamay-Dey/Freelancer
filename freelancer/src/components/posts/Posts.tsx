import React from 'react'
import PostCard from './PostCard'

function Posts({posts}:{posts:PostType[] | []}) {
  return (
    <div>
      {posts && posts.length > 0 && posts.map((item: PostType,index: number) => (
              <PostCard post={item} user={data.session?.user!} key={index}/>
            ))}
    </div>
  )
}

export default Posts