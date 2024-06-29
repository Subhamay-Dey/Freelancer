"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loader from './Loader';
import { useFormState } from 'react-dom';
import { loginAction } from '@/actions/authActions';

const initState = {
  status: 0,
  errors: {},
}

export default function Login() {
  const [state, formAction] = useFormState(loginAction, initState)
  return (
    <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
            Give your details and login into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={formAction}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder='Enter your email' name='email'/>
                <span className='text-red-500 '>{state?.errors?.email}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder='Enter your password' name='email'/>
                <span className='text-red-500 '>{state?.errors?.password}</span>
              </div>
              <div>
              <Loader/>
              </div>
            </form>

          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
  )
}
