"use client"
import { useActionState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


import { signupAction} from "@/actions/serverActions" 
const initialState = {
  message: '',
}
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [state, formAction, pending] = useActionState(signupAction, initialState)
  console.log(state.error)

    
  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center mt-16 ", className)} {...props}>
         <h1>LogIn</h1>
      <Card className="w-[30%]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
           
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">

                <div className='flex gap-10'>
                             <div className="grid gap-3">
                <Label htmlFor="email">First Name 
            <h1 className='text-red-400'>{state.error}</h1></Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  required
                />
              </div>
                       <div className="grid gap-3">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  required
                />
              </div>
                </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email 
            <h1 className='text-red-400'>{state.error}</h1></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required name="password"/>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Login
                </Button>
            
              </div>
            </div>
     
          </form>
          <div className="mt-2">
              <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
                       <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
