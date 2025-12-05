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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 px-4 sm:px-6 lg:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-100 p-8 sm:p-10 shadow-2xl border border-slate-200">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_15%_20%,#e0f2fe,transparent_40%),radial-gradient(circle_at_80%_0,#bae6fd,transparent_35%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200">
                Where Numbers Become Your Superpower
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                We design math adventures that feel like creative quests.
              </h1>
              <p className="text-slate-700 text-lg">
                Our team blends pedagogy, design, and engineering to keep kids curious,
                confident, and celebrated. Every puzzle, hint, and community interaction is
                crafted to nurture joyful problem-solving.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold border border-slate-200">
                  Human + AI guidance
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold border border-slate-200">
                  Moderated community
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold border border-slate-200">
                  Confidence-first design
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-white p-5 shadow-xl border border-slate-200">
                <Image
                  src={MathImage}
                  alt="Math hero section image"
                  className="rounded-xl w-full h-auto border border-slate-200"
                />
                <p className="mt-4 text-sm text-slate-700">
                  Figured is built by educators, Olympiad medalists, and engineers who care
                  deeply about equitable access to problem-solving joy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              What we believe
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Beliefs that shape every interaction
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreBeliefs.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3 shadow-sm"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-slate-100 size-12 text-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 text-center">
                  {item.title}
                </h3>
                <p className="text-slate-700 text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Meet the team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              The brains behind the puzzles
            </h2>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-full lg:max-w-[80%] md:max-w-[90%] mx-auto">
              {teamMembers.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 p-5 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatarUrl}
                      alt={`Image of team member ${item.name}`}
                      className="size-16 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-slate-700 text-sm">{item.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-700">{item.about}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Reach out
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              We’d love to hear from you
            </h2>
            <p className="text-slate-700 max-w-3xl mx-auto">
              Whether you’re a parent, educator, or learner, tell us what you need. We
              respond to every note and use your feedback to improve the experience.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 p-8 sm:p-10 shadow-2xl text-center text-white">
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                danieldkdao@gmail.com
              </p>
              <p className="text-white/90">
                Prefer async? Share your ideas, challenges, or classroom stories. We’ll
                follow up with tailored resources.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
                  Dedicated support hours weekly
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
                  Built with educators
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
                  Feedback-driven roadmap
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
