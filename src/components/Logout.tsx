'use client'

import React from 'react'
import { Button } from './ui/button'
import { getLogout } from '@/actions/serverActions'

const Logout = () => {
  return (
    <form action={getLogout}>
      <Button type="submit">LogOut</Button>
    </form>
  )
}

export default Logout
