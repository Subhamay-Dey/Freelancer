import React, { useState } from 'react'

import {LogOut, Moon, Settings, SettingsIcon, Sun} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useTheme } from 'next-themes'
import {createClient} from "@/supabase/supabaseClient"
import {useRouter} from "next/navigation"

export function SettingDropdown() {

  const {setTheme, theme} = useTheme()
  const [open, setOpen] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  const logout = async() => {
     await supabase.auth.signOut()
     router.push("/login")
  }

  return (
  <>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ready to Logout?</AlertDialogTitle>
          <AlertDialogDescription>
            This action expire your current session and you have to login again to access this page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 hover:bg-red-600' onClick={logout}>Yes Logout !</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon size={30} className='cursor-pointer'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => setTheme("light")} 
            className={`cursor-pointer ${theme === "light" ? "text-primary font-bold" : ""}`}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")} 
            className={`cursor-pointer ${theme === "dark" ? "text-primary font-bold" : ""}`}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")} 
            className={`cursor-pointer ${theme === "system" ? "text-primary font-bold" : ""}`}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)} >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
  )
}
