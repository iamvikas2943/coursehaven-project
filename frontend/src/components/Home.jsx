import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '/logo1.jpg'; // Make sure the path is correct!
import axios from 'axios';
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";



function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, { withCredentials: true });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchcourses", error);
      }
    };
    fetchcourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialslide: 0,
    autoplay: true,
    nextArrow: (
      <div className="slick-next custom-arrow">
        <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-blue-500">
          <span className="text-xl">❯</span>
        </button>
      </div>
    ),
    prevArrow: (
      <div className="slick-prev custom-arrow">
        <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-blue-500">
          <span className="text-xl">❮</span>
        </button>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen flex flex-col">
      <div className="flex-1 text-white container mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="CourseHaven Logo"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              CourseHaven
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
          </header>

        {/* Hero Section */}
        <section className="text-center py-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-orange-500 mb-6">
            Welcome to CourseHaven!
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Your destination for quality courses.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"https://www.youtube.com/learncodingofficial"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
         
        </section>

        {/* Course Slider */}
        <section>
  <Slider {...settings} className="gap-x-6">
    {courses.map((course) => (
      <div key={course._id} className="px-4">
        <div className="relative flex-shrink-0 w-[280px] transition-transform duration-300 transform hover:scale-105 mx-auto">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <img className="h-40 w-full object-contain" src={course.image.url} alt="" />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-white">{course.title}</h2>
              <div className="mt-6">
                <Link to={`/buy/${course._id}`} className="mt-8 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</section>


        <br/>

        {/* Divider */}
        <hr className="border-gray-600" />

        {/* Footer */}
        <footer className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Socials */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="CourseHaven Logo" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
              </div>
              <p className="mt-4 text-gray-400">Follow us:</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-blue-400 transition duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-pink-500 transition duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="hover:text-blue-500 transition duration-300">
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>

            {/* Connect Links */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition duration-300">
                  YouTube
                </li>
                <li className="hover:text-white cursor-pointer transition duration-300">
                  Telegram 
                </li>
                <li className="hover:text-white cursor-pointer transition duration-300">
                  Github 
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">© 2024 CourseHaven</h3>
              <ul className="space-y-2 text-gray-400 text-center">
                <li className="hover:text-white cursor-pointer transition duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer transition duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer transition duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
