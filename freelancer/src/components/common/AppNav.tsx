"use client";
import Image from 'next/image';
import React from 'react';
import { ArrowLeft, Bell, HomeIcon, Search, StickyNote, User} from "lucide-react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AddPosts from '../posts/AddPosts';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { SettingDropdown } from './Setting';

export default function AppNav({user}:{user:SupabaseUser}) {
  
  const pathname = usePathname();
  console.log("The current path is", pathname);

  const router = useRouter();
  const staticRoutes = ["/", "/search", "/notifications", "/profile"]
  
  return (
    <nav className='hidden md:flex justify-between items-center p-2'>
        <Image src={"/images/logo_512.png"} priority width={60} height={60} alt='logo'/>

        <div className='flex space-x-12 items-center'>

          {!staticRoutes.includes(pathname) && <ArrowLeft size={30} className='cursor-pointer bg-gray-600 hover:bg-gray-500 h-10 w-10 p-2 rounded-[50%]' onClick={() => router.back()}/>}

          <Link href={"/"} className={`cursor-pointer hover:text-foreground ${pathname === "/" ? "text-foreground" : "text-gray-500"} `}>
            <HomeIcon size={30}/>
          </Link>
            
            <Link href={"/search"} className={`cursor-pointer hover:text-foreground ${pathname === "/search" ? "text-foreground" : "text-gray-500"} `}>
              <Search size={30}/>
            </Link>
            
            <AddPosts user={user}>
              <StickyNote size={30} className="text-gray-500 cursor-pointer hover:text-foreground"/>
            </AddPosts>
            

            <Link href={"/notifications"} className={`cursor-pointer hover:text-foreground ${pathname === "/notifications" ? "text-foreground" : "text-gray-500"} `}>
              <Bell size={30}/>
            </Link>
            
            <Link href={"/profile"} className={`cursor-pointer hover:text-foreground ${pathname === "/profile" ? "text-foreground" : "text-gray-500"} `}>
              <User size={30}/>
            </Link>
            
        </div>

        <SettingDropdown/>
    </nav>
  )
} 