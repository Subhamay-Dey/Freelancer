"use client";
import Image from 'next/image';
import React from 'react'
import {Bell, HomeIcon, Search, Settings, StickyNote, User} from "lucide-react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default async function AppNav() {

  const pathname = usePathname();
  console.log("The current path is", pathname);
  
  return (
    <nav className='flex justify-between items-center p-2'>
        <Image src={"/images/logo_512.png"} width={60} height={60} alt='logo'/>

        <div className='flex space-x-12'>
          <Link href={"/"} className={`cursor-pointer ${pathname === "/" ? "text-foreground" : "text-gray-500"} `}>
            <HomeIcon size={30}/>
          </Link>
            
            <Link href={"/search"} className={`cursor-pointer ${pathname === "/search" ? "text-foreground" : "text-gray-500"} `}>
              <Search size={30}/>
            </Link>
            
            <StickyNote size={30}/>

            <Link href={"/notifications"} className={`cursor-pointer ${pathname === "/notifications" ? "text-foreground" : "text-gray-500"} `}>
              <Bell size={30}/>
            </Link>
            
            <Link href={"/profile"} className={`cursor-pointer ${pathname === "/profile" ? "text-foreground" : "text-gray-500"} `}>
              <User size={30}/>
            </Link>
            
        </div>

        <Settings/>
    </nav>
  )
}