"use client"

import { Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import { SettingDropdown } from './Setting'
import AddPosts from '../posts/AddPosts'
import { User } from '@supabase/supabase-js'

function MobileAppNav({user}:{user:User}) {
  return (
    <div className='md:hidden lg:hidden xl:hidden '>
        <nav className='flex justify-between items-center p-2'>
            <MobileSidebar/>
            <Image src={"/images/logo_512.png"} alt='mobilelogo' width={40} height={40}/>
            <SettingDropdown/>
        </nav>
        <button className='bg-primary absolute bottom-2 right-2 h-14 w-14 rounded-full flex justify-center items-center text-white'>
          <AddPosts user={user}>
            <Plus size={30}/>
          </AddPosts>
        </button>
    </div>
  )
}

export default MobileAppNav