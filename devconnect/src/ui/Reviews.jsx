'use client';
import React from "react";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Default styles for react-responsive-carousel

const Reviews = () => {
  const testimonials = [
    {
      name: "Anakin Skywalker",
      feedback: "The best platform for bloggers!",
      detail:
        "This app has transformed my blogging experience. The collaboration tools make it super easy to co-write and get feedback in real time!",
      img: "https://i.pinimg.com/474x/d7/de/e5/d7dee5540ed82113137f61afb800cc44.jpg",
    },
    {
      name: "Padme",
      feedback: "Seamless writing and editing",
      detail:
        "I love how smooth the editing process is. The live collaboration feature has helped me work with my co-authors effortlessly!",
      img: "https://i.pinimg.com/474x/3a/e3/75/3ae3753d754ee6c16a3f3a331c999afb.jpg",
    },
    {
      name: "Obi Wan",
      feedback: "A must-have for content creators",
      detail:
        "The interface is clean, and the workflow is intuitive. It's helped me streamline my blogging process and improve my content quality.",
      img: "https://i.pinimg.com/474x/5f/14/4f/5f144f2b3c07137cb3f1fb021101bfbe.jpg",
    },
    {
      name: "Yoda",
      feedback: "Great for team projects",
      detail:
        "As a journalist, collaborating with my team on articles has never been easier. The real-time updates save so much time!",
      img: "https://i.pinimg.com/474x/01/6d/a3/016da38c26970252f02b3d78f5125f60.jpg",
    },
    {
      name: "Luke Skywalker",
      feedback: "Enhanced my writing process",
      detail:
        "The review system and inline commenting make editing a breeze. It has significantly improved the way I write and publish blogs!",
      img: "https://i.pinimg.com/474x/1d/60/bd/1d60bd415a250714641c2bd135cb9ec9.jpg",
    },
    {
      name: "Hans Solo",
      feedback: "Perfect for creative teams",
      detail:
        "We use this app for brainstorming, drafting, and finalizing our content. It’s been a game-changer for our editorial team!",
      img: "https://i.pinimg.com/474x/18/ec/f2/18ecf217cbbf5a956630d813999e3f14.jpg",
    },
    {
      name: "Chewbacca",
      feedback: "Highly recommended for bloggers!",
      detail:
        "The ability to co-edit and track changes in real-time makes this platform my top choice for blog writing and publishing.",
      img: "https://i.pinimg.com/474x/51/5f/cf/515fcf1c5b3ee74be17bc5e95309be58.jpg",
    },
  ];

  return (
    <div className="bg-white w-full h-screen rounded-lg p-8 flex items-center">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        showIndicators={false}
        centerMode
        centerSlidePercentage={33.33}
        interval={3000}
        className="w-full mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 rounded-lg shadow-lg text-center flex flex-col items-center gap-4 m-4 h-[100%] hover:bg-gray-500 
            justify-center cursor-pointer"
          >
            <Image
              src={testimonial.img}
              width={100}
              height={100}
              alt={testimonial.name}
              className="rounded-full max-w-[30%] max-h-[30%]"
            />
            <h2 className="text-xl font-bold">{testimonial.name}</h2>
            <span className="text-sm font-semibold text-gray-500 mb-5">
              {testimonial.feedback}
            </span>
            <p className="text-gray-700 text-sm font-semibold text-left">{testimonial.detail}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
