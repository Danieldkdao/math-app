"use client";

import Marquee from "react-fast-marquee";
import React from "react";
import ProfileImage from "@/public/profile_img_1.png";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";

const InfiniteSlide = () => {
  const items = [
    {
      image: ProfileImage,
      name: "Sarah P.",
      title: "Mom of a 3rd Grader",
      content:
        "This site has been a game-changer for my daughter. The puzzles are so engaging she doesn't even realize she's practicing core math skills!",
      rating: 5,
    },
    {
      image: ProfileImage,
      name: "Mark T.",
      title: "Dad of Two",
      content:
        "Finally, screen time I can feel good about! My boys are now racing to solve problems instead of just playing mindless games. It's fantastic.",
      rating: 5,
    },
    {
      image: ProfileImage,
      name: "Emily R.",
      title: "Elementary School Teacher",
      content:
        "An amazing resource for building number sense. It makes abstract concepts visual and fun, which has helped my students tremendously.",
      rating: 4,
    },
    {
      image: ProfileImage,
      name: "David L.",
      title: "Parent of a 5th Grader",
      content:
        "My son used to struggle with his math homework, but his confidence has soared since using this app. The progress tracking is a great feature.",
      rating: 5,
    },
    {
      image: ProfileImage,
      name: "Jessica W.",
      title: "Homeschooling Parent",
      content:
        "This is the perfect supplement to our curriculum. The creative challenges keep my kids interested and teach them how to think logically.",
      rating: 4,
    },
  ];

  const stars = [1, 2, 3, 4, 5];

  return (
    <Marquee
      speed={60}
      pauseOnHover={true}
    >
      {items.map((item, index) => (
        <div key={index} className="bg-gray-200 mx-10 p-5 rounded-xl flex flex-col w-80 items-center h-full gap-2">
          <Image src={item.image} alt="User testimonial image" height={40}/>
          <div className="flex">
            {stars.map((num) => {
              if (num <= item.rating) return <FaStar key={num}/>;
              return <FaStar color={"#ccc"} key={num}/>;
            })}
          </div>
          <p className="font-medium text-center">"{item.content}"</p>
          <p>- {item.name}</p>
          <p className="text-sm text-gray-500">{item.title}</p>
        </div>
      ))}
    </Marquee>
  );
};

export default InfiniteSlide;
