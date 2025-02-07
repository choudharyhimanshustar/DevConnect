'use client'
import gsap from "gsap";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import Image from "next/image";
import { LiaPenFancySolid } from "react-icons/lia";


const MainHeading = () => {
    const router = useRouter();
    useEffect(() => {
        gsap.fromTo('#heading', { opacity: 0, y: 200 }, { opacity: 1, y: 50, duration: 2 })
    }, [])
    return (
        <div className="items-center justify-center bg-[#ebedec] h-full w-full">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 id="heading" className="opacity-0 text-9xl">Writerly</h1>
                <div 
                onClick={() => router.push('/pages/write')}
                className="rounded-lg cursor-pointer fixed top-0 right-0 m-2 mr-10 flex flex-row border-2 border-black px-1 py-2 font-bold items-center justify-center gap-10 w-[15%]">
                    <p>Start Writing</p>
                    <LiaPenFancySolid />
                </div>

                <Image src={"https://i.pinimg.com/736x/e4/4f/d2/e44fd2939bba0cc10e5216c42f1d1263.jpg"} width={150} height={100} alt={"logo"} />
                <span className="font-semibold">Write | Edit | Collaborate</span>
                <div className="space-x-10 mt-10 justify-between">
                    <button className="before:ease-in relative  overflow-hidden  border-2 rounded-lg border-black text-gray-500 font-semibold px-2 py-1 shadow-2xl 
          transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 
           before:bg-gray-500 before:duration-300 hover:text-gray-100  hover:before:h-64 hover:before:-translate-y-32"
                        onClick={() => router.push('/pages/signup')}>
                        <span className="relative z-10">SignUp</span></button>
                    <button className="before:ease-in relative  overflow-hidden  border-2 rounded-lg border-black text-gray-500 font-semibold px-2 py-1 shadow-2xl 
          transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 
           before:bg-gray-500 before:duration-300 hover:text-gray-100  hover:before:h-64 hover:before:-translate-y-32"
                        onClick={() => router.push('/pages/login')}>
                        <span className="relative z-10">Login</span></button>
                </div>
            </div>
        </div>
    )
}

export default MainHeading
