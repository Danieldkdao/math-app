import React from "react";
import Faq from "./Faq";

const Faqs = () => {
  const faqs = [
    {
      question: "What age group is this website for?",
      answer:
        "Our content is designed primarily for kids aged 6 to 12 (Grades 1-6). The problems are structured to grow with your child, starting with basic concepts and moving to more complex logic puzzles.",
    },
    {
      question: "Is this service completely free to use?",
      answer:
        "Yes! We offer a wide variety of puzzles and learning modules for free. We also have a premium subscription that unlocks advanced topics, detailed progress reports, and exclusive weekly challenges.",
    },
    {
      question: "How is this different from regular school homework?",
      answer:
        "We focus on making math an adventure! Instead of repetitive drills, we use creative stories, logic puzzles, and real-world challenges to teach problem-solving skills and build confidence.",
    },
    {
      question: "Can I track my child's progress?",
      answer:
        "Absolutely. With a free account, you can see completed topics and achievements. Our premium plan offers detailed reports on strengths, areas for improvement, and time spent learning.",
    },
    {
      question: "Are the problems aligned with school standards?",
      answer:
        "Yes, our curriculum is designed to complement common educational standards. We aim to reinforce core concepts learned in school but in a more engaging and thought-provoking way.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-1">
      {faqs.map((item, index) => {
        return (
          <Faq key={index} item={item}/>
        );
      })}
    </div>
  );
};

export default Faqs;
