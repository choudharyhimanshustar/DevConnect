'use client'
/* eslint-disable */
import { React, useEffect } from 'react'
import Image from 'next/image'
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#BloggingImage",
                start: "top bottom",
                end: "bottom center",
                scrub: true,
            }
        });
        tl.fromTo("#BloggingImage",
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
        <div className='w-full h-screen flex items-center justify-center space-x-10'>
            <div className='flex flex-col w-full max-w-[50vw] space-y-8'>
                <div className='space-y-2 zoom-span flex flex-col text-center p-2 border border-2 rounded-lg border-dashed hover:bg-gray-100 
                hover:border-dotted duration:300'>
                    <PiPlugsConnectedFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Connect Writers</span>
                    <span>
                        Network with fellow bloggers, share insights, and grow together in a thriving writing community.
                    </span>
                </div>
                <div className='space-y-4 flex flex-col text-center border zoom-span p-2 border-2 rounded-lg border-dashed'>
                    <BsFillJournalBookmarkFill className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Publish & Edit</span>
                    <span>
                        Write blogs, edit collaboratively, and refine your work with real-time feedback.
                    </span>
                </div>
                <div className='space-y-4 flex flex-col text-center border zoom-span border-2 p-2 rounded-lg border-dashed'>
                    <FaUsers className='mx-auto text-3xl' />
                    <span className="font-bold text-xl">Collaborate</span>
                    <span>
                        Work with co-authors, edit together, and make every blog a masterpiece.
                    </span>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center p-2'>
                <Image 
                    src={"https://i.pinimg.com/474x/43/89/2f/43892fabc678e6aad8c76ce73167e3bd.jpg"} 
                    width={200} height={100} 
                    alt={"Blogging"} 
                    id='BloggingImage' 
                />
                <span className='font-semibold'>"We would be honored if you would join us."</span>
            </div>
        </div>
    )
}

export default Intro;
