"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {

    const path = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
        <div className='flex gap-2 justify-center items-center'>
        <Image src={"/logo.svg"} width={30} height={10} alt="logo" />
        <p className='text-[#2f436e] font-black text-xl'>AI INTERVIEW</p>
        </div>
        <ul className='hidden md:flex gap-6'>
            <li className={` hover:text-[#2f436e] hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard' && 'text-[#2f436e] font-bold'}`}>Dashboard</li>
            <li className={`hover:text-[#2f436e] hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/questions' && 'text-[#2f436e] font-bold'}`} >Questions</li>
            <li className={`hover:text-[#2f436e] hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/upgrade' && 'text-[#2f436e] font-bold'}`} >Upgrade</li>
            <li className={`hover:text-[#2f436e] hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/how' && 'text-[#2f436e] font-bold'}`} >How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header