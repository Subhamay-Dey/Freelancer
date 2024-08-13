import React from 'react'
import {createClient} from "../../../supabase/supabaseServer"
import { cookies } from 'next/headers'

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
    <div>Notifications</div>
  )
}

export default Notifications