"use client"

import { MenuIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function MobileAppNav() {
  return (
    <div>
        <nav className='md:hidden lg:hidden xl:hidden flex justify-between items-center p-2'>
            <MenuIcon size={30}/>
            <Image src={"/images/logo_512.png"} alt='mobilelogo' width={40} height={40}/>
            <Settings size={30}/>
        </nav>
    </div>
  )
}

export default MobileAppNav