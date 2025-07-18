import React from 'react'
import Search from '@/app/Mini Components/Search'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cookies } from 'next/headers'
import Logout from './Logout'
import Token from './Token'
const Navbar = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
   
  return (
    <nav className='sticky z-100 top-0 left-0 '>
        <div className='flex justify-between items-center px-4 py-2 border border-b border-gray-300 '>
            <Link href="/" className='font-bold text-lg'>Quick Chat</Link>
            {/* <div className='sm:hidden'><Search /></div> */}
            <Token token={token?.value}/>
            <div>
                <ul className='flex gap-3 items-center'>
                    <li><Link href={"/"}>Home</Link></li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Signup</li>
                    <li>{token?.value ? <Logout /> : <Link href="/login"><Button>Login</Button></Link>}</li>

                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar