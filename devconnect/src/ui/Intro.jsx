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
        const spans = document.querySelectorAll(".zoom-span");
        spans.forEach((span) => {
            const hoverIn = () => {
                gsap.to(span, {
                    scale: 1.2,
                    duration: 0.5,
                });
            };

            const hoverOut = () => {
                gsap.to(span, {
                    scale: 1,
                    backgroundColor: "transparent",
                    duration: 0.3,
                });
            };

            span.addEventListener("mouseenter", hoverIn);
            span.addEventListener("mouseleave", hoverOut);
        });
    }, [])
    return (
        <div className='w-full h-screen flex  items-center justify-center space-x-10'>
            <div className='flex flex-col w-full max-w-[50vw]  space-y-8'>
                <div className='space-y-2  zoom-span  flex flex-col text-center p-2 border border-2 rounded-lg  border-dashed hover:bg-gray-100 
                hover:border-dotted duration:300'>
                    <PiPlugsConnectedFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl ">Connects Developers</span>

                    <span>
                        Seamless networking, collaboration, and knowledge sharing among developers
                    </span>

                </div>
                <div className='space-y-4 flex flex-col text-center border zoom-span p-2 border-2 rounded-lg border-dashed'>
                    <BsFillProjectorFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">ShowCase Projects</span>

                    <span>
                        Allows developers to display their work, share project details, and demonstrate their skills
                    </span>

                </div>
                <div className='space-y-4 flex flex-col text-center border zoom-span border-2 p-2 rounded-lg  border-dashed'>
                    <FaHandshake className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Collaborate</span>

                    <span>
                        Enables developers to work together seamlessly, sharing updates, code
                    </span>

                </div>
            </div>
            <div className='flex flex-col justify-between items-center p-2'  >
                <Image src={"https://i.pinimg.com/474x/43/89/2f/43892fabc678e6aad8c76ce73167e3bd.jpg"} width={200} height={100} alt={"StarWars"}
                    id='DarthVader' />
                <span className='font-semibold'>We Would Be Honored If You Would Join Us</span>
            </div>
        </div>

    )

}

export default Intro
