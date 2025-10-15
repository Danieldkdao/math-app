import React from "react";
import { FaCheck } from "react-icons/fa6";

const GetStartedPage = () => {
  const freeFeatures = [
    "Access to 20 introductory math puzzles",
    "Create one profile for a single child",
    "Basic progress tracking for completed puzzles",
    "Standard email support",
    "Ad-supported experience",
  ];

  const premiumFeatures = [
    "Unlimited access to our full library of 500+ puzzles and adventures",
    "Create up to 4 child profiles on one account",
    "Detailed parent progress reports and skill insights",
    "Priority, direct-chat support",
    "A completely ad-free and uninterrupted experience",
  ];

  return (
    <div className="mt-16 flex flex-col gap-32">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Pricing</h1>
        <div className="flex gap-4">
          <div className="bg-gray-200 rounded-xl p-5 flex flex-col gap-4 flex-1">
            <h1 className="text-2xl font-bold">Free plan</h1>
            <h1 className="text-gray-500">
              <span className="text-2xl font-bold text-black">$0</span>/month
            </h1>
            <div className="flex flex-col gap-2">
              {freeFeatures.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck />
                    <p className="text-lg font-medium">{item}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 flex items-end">
              <button
                disabled
                className="text-lg cursor-not-allowed font-medium bg-blue-500/100 opacity-40 py-2 px-20 rounded-lg transition-all duration-200 ease-in-out text-white w-full"
              >
                Current Plan
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl p-5 flex flex-col gap-4 flex-1">
            <h1 className="text-2xl font-bold">Premium plan</h1>
            <h1 className="text-gray-500">
              <span className="text-2xl font-bold text-black">$25</span>/month
            </h1>
            <div className="flex flex-col gap-2">
              {premiumFeatures.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck />
                    <p className="text-lg font-medium">{item}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 flex items-end">
              <button
                disabled
                className="text-lg cursor-pointer font-medium bg-blue-500/100 py-2 px-20 rounded-lg hover:bg-blue-500/50 active:scale-95 transition-all duration-200 ease-in-out text-white w-full"
              >
                Get plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
