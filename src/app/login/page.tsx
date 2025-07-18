import { LoginForm } from '@/components/auth/login-form'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
          <LoginForm />                             
    </div>
  )
}

export default page