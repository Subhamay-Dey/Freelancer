import React from 'react'
import { createClient } from '@/supabase/supabaseServer'
import { cookies } from 'next/headers'
import UserAvatar from '@/components/common/UserAvatar'
import { getS3Url } from '@/helpers/helper'

async function User({params}:{params:{id:string}}) {

    const supabase = createClient(cookies())

    const {data:user, error} = await supabase.from("users").select("id, name, username, email, profile_image, metadata").eq("id", params.id).single()

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
    </div>
  )
}

export default User