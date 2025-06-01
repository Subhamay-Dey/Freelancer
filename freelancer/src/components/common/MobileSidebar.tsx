"use client"
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bell, Home, MenuIcon, Search, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

function MobileSidebar() {

    const [open, setOpen] = useState(false)
    const staticClass = "flex space-x-4 mb-6 items-center"
    const LinkClass = "flex w-full"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild>
        <MenuIcon size={30} className='cursor-pointer'/>
    </SheetTrigger>
    <SheetContent side={"left"} className="w-4/6">
        <div className='flex justify-center items-center'>
            <Image src={"/images/logo_512.png"} alt='mobilelogo' width={40} height={40}/>
        </div>

        <ul>
            <li className={staticClass}>
                <Link href={"/"} className={LinkClass} onClick={() => setOpen(false)}>
                    <Home size={25} />
                    <div className='pl-4'>
                        {"Home"}
                    </div>
                </Link>
            </li>
            <li className={staticClass}>
                <Link href={"/search"}className={LinkClass} onClick={() => setOpen(false)}>
                    <Search size={25}/>
                    <div className='pl-4'>  
                        {"Search"}
                    </div>
                </Link>
            </li>
            <li className={staticClass}>
                <Link href={"/notifications"} className={LinkClass} onClick={() => setOpen(false)}>
                    <Bell size={25}/>
                    <div className='pl-4'>
                        {"Notifications"}
                    </div>
                </Link>
            </li>
            <li className={staticClass}>
                <Link href={"/profile"} className={LinkClass} onClick={() => setOpen(false)}>
                    <User size={25}/>
                    <div className='pl-4'>
                        {"Profile"}
                    </div>
                </Link>
            </li>
        </ul>
    </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar