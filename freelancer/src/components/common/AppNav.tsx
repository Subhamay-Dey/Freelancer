"use client";
import Image from 'next/image';
import React from 'react'
import {HomeIcon, Settings} from "lucide-react"

export default async function AppNav() {
  return (
    <nav className='flex justify-between items-center p-2'>
        <Image src={"/images/logo_512.png"} width={60} height={60} alt='logo'/>

        <div>
            <HomeIcon/>
        </div>

        <Settings/>
    </nav>
  )
}