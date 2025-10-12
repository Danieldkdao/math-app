"use client";

import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

type FaqPropsType = {
  question: string;
  answer: string;
};

const Faq = ({ item }: { item: FaqPropsType }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      onClick={() => setShowAnswer(!showAnswer)}
      className="bg-gray-100 p-5 rounded-lg flex flex-col cursor-pointer transition-all duration-300 ease-in-out"
    >
      <div className="flex w-full gap-2">
        <h1 className="text-xl font-medium flex-1">{item.question}</h1>
        <button
          className={`cursor-pointer transition-all duration-300 ease-in-out ${
            showAnswer ? "rotate-90" : ""
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showAnswer ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500">{item.answer}</p>
      </div>
    </div>
  );
};

export default Faq;
