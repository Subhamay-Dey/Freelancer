import React from 'react'
import {createClient} from "../../../supabase/supabaseServer"
import { cookies } from 'next/headers'
import UserAvatar from '@/components/common/UserAvatar'
import { formatDate } from '@/helpers/helper'

async function Notifications() {

    const supabase = createClient(cookies())

    const {data} = await supabase.auth.getSession()

    const {data: notification_data, error: notification_error} = await supabase
    .from("notification")
    .select("id, user_id, post_id, type, created_at, users(id, name, username, profile_image)")
    .eq("to_user_id", data.session?.user?.id)
    .order("id", {ascending: false})

    console.log("The notifications:", notification_data);
    console.log("The error is:", notification_error);

  return (
    <div>
        {notification_data && notification_data.length > 0 && notification_data.map((item:NotificationType, index) => (
            <div className='flex space-x-3 items-center my-2' key={index}>
                <UserAvatar name={item.users?.name!} image={item.users?.profile_image!}/>
                <div>
                  <p className='flex gap-4'>
                    <strong>{item.users?.name!}</strong>
                    <p>{item.type === 1 ? "liked your post" : "commented on your post"}</p>
                  </p>
                  <p className='text-sm text-gray-400'>{formatDate(item.created_at)}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Notifications