import Image from "next/image";
import UsersImage from "@/public/user_group.png";
import { FaCalculator } from "react-icons/fa6";
import InfiniteSlide from "@/components/Home/InfiniteSlide";
import Faqs from "@/components/Home/Faqs";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export default function Home() {
  const howWeDoItCards = [
    {
      title: "Reason #1",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus nobis explicabo dicta nihil natus, quis mollitia ipsum magni illo optio necessitatibus! Ex quasi ratione dicta minus accusantium aspernatur dolores id.",
      icon: <FaCalculator size={40} />,
    },
    {
      title: "Reason #2",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus nobis explicabo dicta nihil natus, quis mollitia ipsum magni illo optio necessitatibus! Ex quasi ratione dicta minus accusantium aspernatur dolores id.",
      icon: <FaCalculator size={40} />,
    },
    {
      title: "Reason #3",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus nobis explicabo dicta nihil natus, quis mollitia ipsum magni illo optio necessitatibus! Ex quasi ratione dicta minus accusantium aspernatur dolores id.",
      icon: <FaCalculator size={40} />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[95%] md:w-[90%] lg:w-[80%] flex flex-col items-center gap-32 justify-center">
        <div className="mt-16 flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold text-center max-w-[700px]">
            Understand the universe of numbers{" "}
            <span className="text-blue-400"> - one problem at a time.</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={UsersImage} alt="User testimonials image" height={50} />
            <h1>
              Trusted by{" "}
              <span className="font-bold">10000+ parents and kids</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">How we do it</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            {howWeDoItCards.map((item, index) => {
              return (
                <div
                  className="flex-1 flex flex-col items-center bg-gray-200 rounded-xl p-4 gap-4"
                  key={index}
                >
                  {item.icon}
                  <h1 className="text-xl font-medium ">{item.title}</h1>
                  <p className="text-gray-600 text-center">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">It works</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            {howWeDoItCards.map((item, index) => {
              return (
                <div
                  className="flex-1 flex flex-col items-center bg-gray-200 rounded-xl p-4 gap-4"
                  key={index}
                >
                  {item.icon}
                  <h1 className="text-xl font-medium ">{item.title}</h1>
                  <p className="text-gray-600 text-center">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center max-w-full gap-4">
          <h1 className="text-4xl font-bold text-center">
            What our customers say
          </h1>
          <InfiniteSlide />
        </div>
        <div className="w-[90%] flex flex-col items-center gap-5">
          <h1 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h1>
          <Faqs />
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-center">
            Convinced? Click below to sign up!
          </h1>
          <button className="text-xl font-medium bg-blue-100 py-2 px-20 rounded-lg cursor-pointer hover:bg-blue-50 active:scale-95 transition-all duration-200 ease-in-out">
            Sign up
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
