'use client';
import { React, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
    useEffect(() => {
        // Create a GSAP timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#mainDiv',
                start: 'top center',
                end: 'bottom top',
                scrub: true,
                markers: false, // Set to true for debugging
            }
        });

        // Image animation: scales up and fades out
        tl.to('#carousel', {
            scrollTrigger: {
                trigger: '#carousel',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                markers: false, // Set to true for debugging
            },
            scale: 1.5,
            opacity: 0,
            zIndex: -1,
            duration: 2,
        });

        // Content below animation: fades in and increases z-index
        tl.to('#nextDiv', {
            scrollTrigger: {
                trigger: '#nextDiv',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
                markers: false, // Set to true for debugging
            },
            scale:1.5,
            opacity: 1,
            zIndex: 10,
            duration: 2,
        });

    }, []);

    return (
        <div id="mainDiv" className="relative w-full h-[200vh] overflow-hidden bg-black">
            <Image
                src={"https://i.pinimg.com/originals/2b/f5/20/2bf52068d4472114de09bb2734a70f2e.gif"}
                width={100}
                height={100}
                alt={"Carousel"}
                className="w-full"
                id="carousel"
            />
            <div id="nextDiv" className="absolute w-full h-screen">
                {/* Content of the div that appears after the scroll */}
                <h1 className="text-center text-[#8E1616] text-3xl font-bold">Let Me Take You To A Journey</h1>
            </div>
            <div>
                <div className="">

                </div>
            </div>
        </div>
    );
};

export default Carousel;
