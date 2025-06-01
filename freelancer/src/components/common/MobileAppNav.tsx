"use client"

import { Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import MobileSidebar from './MobileSidebar'

function MobileAppNav() {
  return (
    <div className='md:hidden lg:hidden xl:hidden '>
        <nav className='flex justify-between items-center p-2'>
            <MobileSidebar/>
            <Image src={"/images/logo_512.png"} alt='mobilelogo' width={40} height={40}/>
            <Settings size={30}/>
        </nav>
        <button className='bg-primary absolute bottom-2 right-2 h-14 w-14 rounded-full flex justify-center items-center text-white'><Plus/></button>
    </div>
  )
}

export default MobileAppNav