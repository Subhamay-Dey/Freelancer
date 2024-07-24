"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from '@/actions/authActions';
import {useFormState} from "react-dom"
import Loader from './Loader';

const initState = {
    status: 0,
    errors: {},
}

export default function Register() {
  const [state, formAction] = useFormState(registerAction, initState)
  return (
    <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
            Give your details and login into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={formAction}>
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text" 
                        placeholder='Enter your name' 
                        name="name"
                    />
                    <span className='text-red-500 '>{state?.errors?.name}</span>

                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text" 
                    placeholder='Enter your username' 
                    name='username'
                />
                <span className='text-red-500 '>{state?.errors?.username}</span>
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="text" 
                    placeholder='Enter your email here' 
                    name='email'
                />
                <span className='text-red-500 '>{state?.errors?.email}</span>
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password" 
                    placeholder='Enter your password' 
                    name='password'
                />
                <span className='text-red-500 '>{state?.errors?.password}</span>
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="cpassword">Confirm password</Label>
                <Input
                    id="cpassword"
                    type="password"
                    placeholder='Confirm your password'
                    name='password_confirmation'
                />
                
                </div>
                {/* <Button className='w-full mt-6'>Submit</Button> */}
                <Loader/>
            </form>

          </CardContent>
        </Card>
  )
}