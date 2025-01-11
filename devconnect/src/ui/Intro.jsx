'use client'
/* eslint-disable */
import { React, useEffect } from 'react'
import Image from 'next/image'
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BsFillProjectorFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const Intro = () => {
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#DarthVader",
                start: "top bottom",
                end: "bottom center",
                scrub: true,
            }
        });
        tl.fromTo("#DarthVader",
            { opacity: 0, y: 100 },
            { opacity: 1, y: -25 });
    }, [])
    return (
        <div className='w-full h-screen flex  items-center justify-center space-x-10'>
            <div className='flex flex-col w-full max-w-[50vw]  space-y-8'>
                <div className='space-y-2   flex flex-col text-center mb-5 border border-2 rounded-full  border-dashed hover:rounded-lg'>
                    <PiPlugsConnectedFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Connects Developers</span>

                    <span>
                        Seamless networking, collaboration, and knowledge sharing among developers
                    </span>

                </div>
                <div className='space-y-4 flex flex-col text-center border border-2 rounded-full border-dashed'>
                    <BsFillProjectorFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">ShowCase Projects</span>

                    <span>
                        Allows developers to display their work, share project details, and demonstrate their skills
                    </span>

                </div>
                <div className='space-y-4 flex flex-col text-center border border-2 rounded-full  border-dashed'>
                    <FaHandshake className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Collaborate</span>

                    <span>
                        Enables developers to work together seamlessly, sharing updates, code
                    </span>

                </div>
            </div>
            <div className='flex flex-col justify-between items-center p-2'  >
                <Image src={"https://i.pinimg.com/474x/43/89/2f/43892fabc678e6aad8c76ce73167e3bd.jpg"} width={200} height={100} alt={"StarWars"}
                     id='DarthVader'/>
                <span className='font-semibold'>We Would Be Honored If You Would Join Us</span>
            </div>
        </div>

    )

}

export default Intro
