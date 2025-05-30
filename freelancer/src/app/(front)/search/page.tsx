
import SearchInput from '@/components/common/SearchInput'
import React from 'react'
import { createClient } from '@/supabase/supabaseServer'
import { cookies } from 'next/headers'
import Link from 'next/link'
import UserAvatar from '@/components/common/UserAvatar'
import { getS3Url } from '@/helpers/helper'

async function page({searchParams}:{searchParams: {[key: string] : string | undefined}}) {

  console.log("The search params is", searchParams?.q)
  const supabase = createClient(cookies())
  const {data:user, error} = await supabase
    .from("users")
    .select("id, username, name, profile_image")
    .ilike("username", `%${searchParams?.q}%`)

  console.log("The users are", user)
  console.log("The error is", error)
  return (
    <div>
        <SearchInput/>
        {user && user.length > 0 && user.map((item, index) => (
          <Link href={`/user/${item.id}`} key={index} className='flex space-x-3 mt-4'>
            <UserAvatar 
              name={item.name}
              image={item.profile_image ? getS3Url(item.profile_image) : ""}
            />
            <div className='flex flex-col'>
              <p className='font-bold'>{item.name}</p>
              <p>@{item.username}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default page