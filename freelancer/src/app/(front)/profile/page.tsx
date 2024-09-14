import UserAvatar from '@/components/common/UserAvatar'
import React from 'react'

import {createClient} from "@/supabase/supabaseServer"
import {cookies} from "next/headers"
import { User } from '@supabase/supabase-js'
import ProfileUpdate from '@/components/user/ProfileUpdate'
import { getS3Url } from '@/helpers/helper'

async function Profile() {
  const supabase = createClient(cookies())
  const {data} = await supabase.auth.getSession()
  const user:User = data.session?.user!

  return (
    <div>
      <div className='flex justify-between items-center'>
          <div>
              <p className='text-2xl font-bold'>{user.user_metadata?.["name"]}</p>
              <p className='font-bold'>@{user.user_metadata?.["username"]}</p>
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
      <ProfileUpdate user={user}/>
    </div>
  )
}

export default Profile