'use client';
import React from "react";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Default styles for react-responsive-carousel

const Reviews = () => {
  const testimonials = [
    {
      name: "Anakin SkyWalker",
      feedback: "Fantastic platform for developers!",
      detail:
        "DevConnect has made it so easy for me to collaborate with like-minded developers. The real-time chat and code sharing features are a game-changer. Highly recommend it!",
      img: "https://i.pinimg.com/474x/d7/de/e5/d7dee5540ed82113137f61afb800cc44.jpg",
    },
    {
      name: "Padme",
      feedback: "Great concept, but could improve in performance",
      detail:
        "The platform is excellent for collaboration, but I've noticed some lag during peak hours. Looking forward to future updates that address this.",
      img: "https://i.pinimg.com/474x/3a/e3/75/3ae3753d754ee6c16a3f3a331c999afb.jpg",
    },
    {
      name: "ObiWan",
      feedback: "A must-have for project collaboration",
      detail:
        "I've been using DevConnect for a few weeks now, and the experience has been amazing. The interface is intuitive, and the ability to find developers with specific skills has saved me so much time.",
      img: "https://i.pinimg.com/474x/5f/14/4f/5f144f2b3c07137cb3f1fb021101bfbe.jpg",
    },
    {
      name: "Yoda",
      feedback: "Limited integrations",
      detail:
        "The platform is great for basic collaboration, but I wish there were more integrations with tools like Figma or Jira for end-to-end project management.",
      img: "https://i.pinimg.com/474x/01/6d/a3/016da38c26970252f02b3d78f5125f60.jpg",
    },
    {
      name: "Luke Skywalker",
      feedback: "The perfect hub for developers!",
      detail:"DevConnect brings developers together like no other platform. The skill-matching algorithm is spot on, and the project management tools are super intuitive. It's become my go-to for team collaborations.",
      img: "https://i.pinimg.com/474x/1d/60/bd/1d60bd415a250714641c2bd135cb9ec9.jpg",
    },
    {
      name: "Han Solo",
      feedback: "Incredible networking opportunities!",
      detail:
        "I connected with a fantastic front-end developer for my project within hours of signing up. The community is active, and everyone is so supportive. DevConnect truly lives up to its name.",
      img: "https://i.pinimg.com/474x/18/ec/f2/18ecf217cbbf5a956630d813999e3f14.jpg",
    },
    {
      name: "ChewBecca",
      feedback: "Highly recommend for remote teams.",
      detail:
        "As a part of a distributed team, DevConnect has made collaboration effortless. From video calls to task management, everything just works smoothly. It’s like Slack and Trello combined, but better for developers!",
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
