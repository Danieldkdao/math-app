import Image from "next/image";
import React from "react";
import MathImage from "@/public/about-math.png";
import { FaLightbulb, FaStairs, FaPuzzlePiece } from "react-icons/fa6";

const AboutUsPage = () => {
  const coreBeliefs = [
    {
      title: "Math is Creative",
      icon: <FaLightbulb size={25} />,
      text: "We believe math is more than just memorizing rules. It's a creative tool for solving amazing puzzles and understanding the world around you.",
    },
    {
      title: "Mistakes are Stepping Stones",
      icon: <FaStairs size={25} />,
      text: "Getting an answer wrong is part of learning! Our games encourage trying again and celebrate the process of figuring things out, not just getting the right answer.",
    },
    {
      title: "Every Kid is a Math Kid",
      icon: <FaPuzzlePiece size={25} />,
      text: "We're here to show every child that they are capable of succeeding in math. Our activities are designed to build confidence from the very first click.",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Hailong Dao",
      title: "Cofounder & Math Professor",
      avatarUrl:
        "https://fastly.picsum.photos/id/448/200/300.jpg?hmac=9a1pqR60H2xWN80jPWfmdVkRII-wEQZceiSHpJSZnE4",
      about:
        "A two-time gold medalist at the International Mathematical Olympiad (IMO) and a highly respected figure in the mathematics community. He frequently travels internationally to speak at conferences, lecture at universities, and collaborate with researchers around the world.",
    },
    {
      id: 2,
      name: "Daniel Dao",
      title: "Cofounder & Software Engineer",
      avatarUrl:
        "https://fastly.picsum.photos/id/448/200/300.jpg?hmac=9a1pqR60H2xWN80jPWfmdVkRII-wEQZceiSHpJSZnE4",
      about:
        "As a software engineer on the team, I get to turn our creative ideas into the features you interact with. I wrote the code that makes the puzzle galleries scroll so smoothly and built the system that tracks your daily streaks, ensuring you get credit for your hard work no matter where you are in the world.",
    },
  ];

  return (
    <div className="mt-16 flex flex-col gap-32">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Where Numbers Become{" "}
          <span className="text-blue-400">Your Superpower.</span>
        </h1>
        <p className="text-xl text-center max-w-[500px]">
          We create fun, story-driven math puzzles that build creativity,
          confidence, and a lifelong love for learning.
        </p>
        <Image
          src={MathImage}
          alt="Math hero section image"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">Our beliefs</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          {coreBeliefs.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-gray-200 flex-1 rounded-xl p-5 flex flex-col items-center gap-2"
              >
                {item.icon}
                <h1 className="text-xl font-bold text-center">{item.title}</h1>
                <p className="text-gray-500 text-center">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-16">
        <h1 className="text-4xl font-bold text-center">Meet the brains</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-full lg:max-w-[80%] md:max-w-[90%] p-5">
            {teamMembers.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-gray-200 p-5 rounded-xl"
                >
                  <div className="-mt-15 mb-2">
                    <img
                      src={item.avatarUrl}
                      alt={`Image of team member ${item.name}`}
                      className="size-24 aspect-[1/1] rounded-full"
                    />
                  </div>
                  <h1 className="text-xl font-bold">{item.name}</h1>
                  <p className="mb-4">{item.title}</p>
                  <h1 className="font-medium">About</h1>
                  <p className="text-gray-500">{item.about}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Ready to begin your adventure?
        </h1>
        <button className="text-xl font-medium bg-blue-100 py-2 px-20 rounded-lg cursor-pointer hover:bg-blue-50 active:scale-95 transition-all duration-200 ease-in-out">
          Start now
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;
