import { useState } from "react";

const tutorials = [
  { id: 1, title: "Basic Japanese Greetings", videoId: "mQjSH0p1cxQ" },
  { id: 2, title: "Japanese Alphabet - Hiragana", videoId: "6p9Il_j0zjc" },
  { id: 3, title: "Common Japanese Phrases", videoId: "D-uNsJU6Nl0" },
  { id: 4, title: "Japanese Numbers 1-100", videoId: "23V4DkV-Jlo" },
  { id: 5, title: "Basic Japanese Sentence Structure", videoId: "15ukUhFolU4" },
  { id: 6, title: "Japanese Particles Explained", videoId: "ykBNhy5MpkQ" },
  { id: 7, title: "Japanese Verbs - Present Tense", videoId: "_OAnYtbqr_8" },
  { id: 8, title: "Japanese Adjectives", videoId: "_JIrEHFEsVo" },
];

const Tutorials = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-600 text-center mb-8">
          日本語 Tutorials
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Enhance your Japanese language skills with our curated video tutorials
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tutorial.title}
                </h3>
                <div
                  className="aspect-w-16 aspect-h-9 mb-4 cursor-pointer"
                  onClick={() => setActiveVideo(tutorial.id)}
                >
                  {activeVideo === tutorial.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-md"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setActiveVideo(tutorial.id)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  {activeVideo === tutorial.id
                    ? "Now Playing"
                    : "Watch Tutorial"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
