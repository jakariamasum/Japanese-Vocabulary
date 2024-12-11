import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosPublic from "../lib/axiosPublic";
import { FaVolumeHigh } from "react-icons/fa6";

const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];
    const newParticles = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    const timeout = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

const LearnLesson = () => {
  const { lessonNo } = useParams();
  const [vocabularies, setVocabularies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonNo) {
      fetchVocabularies();
    }
  }, [lessonNo]);

  const fetchVocabularies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get(
        `/vocabularies/lesson/${lessonNo}`
      );

      setVocabularies(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const playPronunciation = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate("/lessons");
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  const currentVocabulary = vocabularies[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        Lesson {lessonNo}
      </h1>
      {currentVocabulary && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 max-w-2xl mx-auto">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-800 cursor-pointer">
              {currentVocabulary.word}
            </h2>
            <button
              onClick={() => playPronunciation(currentVocabulary.word)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
            >
              <FaVolumeHigh size={28} />
            </button>
          </div>
          <p className="text-xl mb-2 text-center text-gray-600">
            {currentVocabulary.pronunciation}
          </p>
          <p className="text-lg mb-4 text-center">
            {currentVocabulary.meaning}
          </p>
          <p className="text-md mb-6 text-center text-gray-500">
            {currentVocabulary.whenToSay}
          </p>
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600">
              {currentIndex + 1} / {vocabularies.length}
            </span>
            {currentIndex === vocabularies.length - 1 ? (
              <button
                onClick={handleComplete}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                Complete
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {showConfetti && <Confetti />}
    </div>
  );
};

export default LearnLesson;
