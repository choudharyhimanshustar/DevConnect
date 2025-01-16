'use client';
import { React, useEffect } from 'react';
import Image from 'next/image';
import Reviews from './Reviews'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
    useEffect(() => {
        // Create a GSAP timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#mainDiv',
                start: 'top top',
                end: 'bottom+=200% top', // Adjust the end position to control when it unpins
                pin: true,
                pinSpacing: false,
                scrub: true,
                markers: false, // Set to true for debugging
            }
        });

        // Image animation: scales up and fades out
        tl.to('#carousel', {
            scrollTrigger: {
                trigger: '#carousel',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
                markers: false, // Set to true for debugging
            },
            scale: 1.5,
            opacity: 0,
            zIndex: 1,
            duration: 2,
        });

        // Content below animation: fades in and increases z-index
        tl.fromTo('#nextDiv', {
            opacity: 0,
        }, {
            scale: 1.5,
            opacity: 1,
            zIndex: 10,
            duration: 1,
        });
        gsap.fromTo(
            '#Reviews',
            {
                y: '100%', // Start below the viewport
                zIndex: 1,
            },
            {
                y: '0%', // Move into view
                zIndex: 10,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#mainDiv',
                    start: 'bottom top', // Start animation when mainDiv is at the top
                    end: 'bottom+=50% top', // Adjust to control the overlap duration
                    scrub: true,
                    markers: false,
                },
            }
        );
    }, []);

    return (
        <>
            <div id="mainDiv" className="relative w-full h-[100vh] bg-black overflow-hidden flex flex-col">
                <Image
                    src={"https://i.pinimg.com/originals/2b/f5/20/2bf52068d4472114de09bb2734a70f2e.gif"}
                    width={100}
                    height={100}
                    alt={"Carousel"}
                    className="w-full h-full object-cover"
                    id="carousel"
                />
                <div id="nextDiv" className="absolute bottom-0 w-full h-full flex items-center justify-center">
                    <h1 className="text-center text-[#8E1616] text-3xl font-bold">
                        This is Where The Fun Begins
                    </h1>
                </div>
            </div>
            <div id="Reviews" className="w-full bg-white h-screen flex items-center justify-center">
                <Reviews />
            </div>
        </>
    );
};

export default Carousel;
