import Lottie from "lottie-react";
import { useState } from "react";
import { Redirect } from 'react-router'
import DoctorAnimation from "../../images/DoctorAnimation.json";

function Hero() {
  const [isClicked,setClicked] = useState(false);

  if(isClicked)
  return <Redirect to={{
    pathname:"/signup",
    state:{
      type:'patient'
    }
  }}/>
  else
  return (
    <section className="text-gray-600 body-font sm:px-20">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="title-font  mb-4 mt-4 font-medium text-gray-900">
            <span className="lg:text-3xl text-2xl">Welcome to </span>
            <h1 className="text-primary xl:text-6xl md:text-5xl text-4xl font-bold mt-2 animate-pulse">
              Spark Healthlines
            </h1>
            <br className="hidden lg:inline-block" />
            <span className="sm:text-2xl text-xl text-gray-500">
              Smooth Checkups
            </span>
          </div>
          <p className="mb-8 leading-relaxed">
            Not to touch shared surfaces and breathe shared air which are beyond
            uncomfortable — they can be unsafe. Virtual waiting rooms enable
            social distancing to support a better patient experience and better
            outcomes.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:opacity-80 rounded text-lg" onClick={(e)=>setClicked(true)}>
              Get started
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Demo
            </button>
          </div>
        </div>
        <div className="lg:max-w-xl md:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Lottie animationData={DoctorAnimation} />
        </div>
      </div>
      <div className="w-20 h-40 absolute bg-light rounded-full top-20 -left-10 transform -rotate-45 hidden md:block"></div>
      <div className="w-28 h-32 absolute rounded-xl bg-light bottom-10 right-8 transform rotate-45 hidden md:block"></div>
    </section>
  );
}

export default Hero;
