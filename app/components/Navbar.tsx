import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'

const Navbar = async () => {

  const session = await auth()
  return (
    <header className="px-5 py-3 bg-black shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5'>
          {session && session?.user ?(
            <>
            <Link href="/sartup/create">
              <span>Creat</span>       
            </Link>
            <form  action={async () => {
              "use server";
              await signOut( {redirectTo: '/' } );
            }}>
              <button type="submit">
                <span>Logout</span>
              </button>

            </form>
              
            <Link href={`/user/${session?.user?.id}`}>
            <span>{session?.user?.name}</span>
            </Link>


            
            </>
          ):(
           <form action ={async () => {
            "use server";
            await signIn('github');
           }}>
            <button type="submit">
              <span>Login </span>
            </button>

            </form>
          )}


        </div>
      </nav>
    </header>  
  )
}

export default Navbar
