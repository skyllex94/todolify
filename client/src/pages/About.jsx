import React from "react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu";
import { useHorizontalScroll } from "../hooks/horizontalScroll";
import Header from "./Header";
import img1 from "../assets/about1.png";
import img2 from "../assets/about3.png";

export default function About() {
  const scrollRef = useHorizontalScroll();

  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />
        <div
          ref={scrollRef}
          style={{ overflow: "auto" }}
          className="flex w-full"
        >
          <main className="container pt-28 px-4 mx-auto w-full">
            <section
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 
            items-center justify-center"
            >
              <div className="leftside-text ml-5">
                <h1 className="text-4xl font-extrabold text-left text-gray-900">
                  Todolify
                </h1>
                <div className="text-lg text-gray-500">
                  <p className="my-4 text-lg text-gray-500">
                    Our app includes <b>timeblocking</b> and{" "}
                    <b>categorization</b> features with which you create a new
                    way of looking at your goals and daily tasks.
                  </p>
                  <p className="my-4">
                    Organize and streamline your whole process and set
                    milestones as you break down your most ambitious goals to
                    smaller and smaller manageable objective you can work on.
                  </p>
                  <p className="mb-4 ">
                    From your day, to week, to month, to your annual goals, it's
                    a full system tracking for your personal success.
                  </p>
                </div>
                <Link
                  to={"/login"}
                  class="inline-flex text-left text-lg text-red-600 hover:underline"
                >
                  Start your productivity journey
                  <svg
                    className="w-6 h-6 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 
                      4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="rightside-img">
                <img src={img1} alt="Task management" />
              </div>

              <div className="leftside-img">
                <img src={img2} alt="Todo list showcase" />
              </div>
              <div className="rightside-text ml-4">
                <h1 className="text-2xl font-extrabold text-left text-gray-900">
                  How is this different from all the other todo list
                  applications?
                </h1>
                <div className="text-lg text-gray-500 my-4">
                  <p>
                    Our app includes timeblocking and categorization features
                    with which you crate a new way of looking at your daily
                    tasks.
                  </p>
                  <p>
                    1. We place your goals and task in what we like to call
                    'buckets' - the categorization part, in which you present a
                    certain aspect of your life you want to develop and that
                    would be the name of you category.
                  </p>
                  <p>
                    2. In each category, you would add your task for the day,
                    which will be "timeblocked", meaning you focus your energy
                    on only this category and execute on all the task inside it
                    for a given time period.
                  </p>
                  <p>
                    3. <i>Voilà!</i> Your productivity and flow state will
                    inevitable increase following this method.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}
