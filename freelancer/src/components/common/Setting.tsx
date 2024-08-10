import React from 'react'

import {
  LogOut,
  Moon,
  Settings,
  SettingsIcon,
  Sun,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from 'next-themes'

export function SettingDropdown() {

  const {setTheme, theme} = useTheme()

  return (
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

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
