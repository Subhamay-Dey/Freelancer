import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from '@/actions/authActions';

const initState = {
    status: 0,
    errors: {},
}

export default function Register() {
  return (
    <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
            Give your details and login into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={registerAction}>
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name" 
                        placeholder='Enter your name' 
                        name='name'
                    />
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="username" 
                    placeholder='Enter your username' 
                    name='username'
                />
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email" 
                    placeholder='Enter your email here' 
                    name='email'
                />
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password" 
                    placeholder='Enter your password' 
                    name='password'
                />
                </div>
                <div className="space-y-1 mt-2">
                <Label htmlFor="cpassword">Confirm password</Label>
                <Input
                    id="confirm-password"
                    type="password" 
                    placeholder='Confirm your password' 
                    name='Confirm_password'
                />
                </div>
                <Button className='w-full mt-6'>Submit</Button>
            </form>

          </CardContent>
        </Card>
  )
}