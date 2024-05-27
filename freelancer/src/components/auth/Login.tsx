import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
            Give your details and login into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder='Enter your email' name='email'/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder='Enter your password' name='email'/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Submit</Button>
          </CardFooter>
        </Card>
  )
}
