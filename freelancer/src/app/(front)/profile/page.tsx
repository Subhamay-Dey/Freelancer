import UserAvatar from '@/components/common/UserAvatar'
import React from 'react'

import {createClient} from "@/supabase/supabaseServer"
import {cookies} from "next/headers"
import { User } from '@supabase/supabase-js'

async function Profile() {
  const supabase = createClient(cookies())
  const {data} = await supabase.auth.getSession()
  const user:User = data.session?.user!
  return (
    <div className='flex justify-between items-center'>
        <div>
            <p className='text-2xl font-bold'>Subho</p>
            <p className='font-bold'>@subho</p>
        </div>
        <UserAvatar name='Subhamay' width={5} height={5}/>
    </div>
  )
} 

export default Profile