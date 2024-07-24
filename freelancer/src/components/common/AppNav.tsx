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
            
            <Search size={30}/>
            <StickyNote size={30}/>
            <Bell size={30}/>
            <User size={30}/>
        </div>

        <Settings/>
    </nav>
  )
}