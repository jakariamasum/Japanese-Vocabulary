import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosPublic from "../lib/axiosPublic";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosPublic.get("/lessons");
        setLessons(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        setError("Failed to load lessons. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 px-4 text-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-8">
          日本語 Lessons
        </h2>
        <p className="text-xl text-gray-700 text-center mb-12">
          Embark on your Japanese language journey with our structured lessons
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <Link
              key={lesson._id}
              to={`/lessons/${lesson.lessonNumber}`}
              className="group bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300">
                    {lesson.lessonNumber.toString().padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600 transition-colors duration-300">
                    Lesson {lesson.lessonNumber}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {lesson.lessonName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Master essential Japanese concepts through interactive
                  exercises and real-world examples.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 flex justify-between items-center">
                <span className="text-white text-sm font-semibold">
                  Start Learning
                </span>
                <svg
                  className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
