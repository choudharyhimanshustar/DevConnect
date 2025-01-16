'use client'
import MainHeading from '../ui/MainHeading'
import Intro from '../ui/Intro'
import Carousel from '../ui/Carousel'
import gsap from "gsap";
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  useEffect(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-heading", // The scroll trigger is on the first screen (MainHeading)
        start: "top top",          // Pin the first screen as soon as it reaches the top
        end: "+=200%",             // Pin it for a bit of scrolling (adjust as needed)
        scrub: true,               // Enable smooth scrubbing
        pin: "#main-heading",      // Pin the first screen
        pinSpacing: false,         // No extra spacing for the pinned element
      },
    });

    // Add animations to the timeline
    tl.to("#intro", {
      scrollTrigger: {
        trigger: "#intro",           // Trigger the second screen (Intro)
        start: "top top",         // When the top of the intro reaches the center of the viewport
        end: "bottom bottom",           // When the bottom of intro reaches the top of the viewport
        scrub: true,                 // Enable smooth scrubbing
        pin: true,                   // Pin the intro element
        pinSpacing: false,           // No extra spacing when pinned
        zIndex: 10,                  // Ensure the second screen overlaps the first
      },
      opacity: 1,                    // Animation for the intro (fade in)
      y: 0,                          // Move intro to normal position
    });

  }, []);
  return (
    <div className='w-full'>
      <div className="MainHeading" id="main-heading">
        <MainHeading />
      </div>
      <div className="Intro  bg-[#f7f7f7]" id="intro">
        <Intro />
      </div>

      <Carousel />
    </div>
  );
}
