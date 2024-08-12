import React from "react";
import { useNavigate } from "react-router-dom";
import DemoRoute from "./DemoRoute";

export default function Hero(){
  const navigate = useNavigate();

  const navigateToSignup = () => {
      navigate("/signup");
  };
    return <section className="bg-slate-50 text-white">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className=" bg-gradient-to-r from-red-400 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Track your Task.
  
          <h1 className=" bg-gradient-to-r from-purple-600 via-blue-500 to-red-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"> Ease your Finance. </h1>
        </h1>
  
        <p className="text-slate-800 mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
          Manage your tasks and finances in one place with TimeBuck. Stay on top of your to-do list and keep your finances in check effortlessly
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={navigateToSignup}

          >
            Get Started
          </a>
          <div className="pt-1">
            <DemoRoute />
          </div>
        </div>
      </div>
    </div>
  </section>

}