import React, { useEffect, useState } from "react";
// import LogoutButton from "./LogoutButton";
import LogoutButton from "./LogoutButton";
import Votes from "./Votes";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_EMBED_MAP_KEY;


const VideoDisplay = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sideBar, setSideBar] = useState(false);
  const [mapBar, setMapBar] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/display/");
        if (!response.ok) {
          throw new Error("Failed to fetch businesses");
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % businesses.length);
  };

  if (businesses.length === 0) {
    return <p>Loading businesses...</p>;
  }

  const business = businesses[currentIndex];
  const videoUrl = `http://127.0.0.1:8000/static/videos/file${business.video}.mp4`;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${business.location}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{business.name}</h2>

        <div className="relative w-3/5 max-w-2xl h-[85vh] rounded-lg overflow-hidden shadow-lg bg-black flex justify-center items-center">
            {business.video ? (
                <>
                    <video
                        key={videoUrl}
                        className="w-full h-full rounded-lg object-cover"
                        autoPlay
                        muted
                        loop
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-0 left-0 right-0 flex justify-center items-center p-4 bg-black/50 text-white">
                        <Votes businessId={business.id} />
                    </div>
                </>
            ) : (
                <p className="text-white text-center p-4">No Video Available</p>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4 bg-black/50">
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                    Next Business
                </button>

                <button
                    onClick={() => setSideBar(true)}
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                    >
                    More Info
                </button>

                <button
                    onClick={() => setMapBar(true)}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                    Map
                </button>

                <LogoutButton />
            </div>
        </div>

        {sideBar && (
            <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                    onClick={() => setSideBar(false)}
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-2">{business.name}</h2>
                <p><strong>Location:</strong> {business.location}</p>
                <p><strong>Hours:</strong> {business.hours}</p>
                <p><strong>Contact:</strong> {business.contact_info}</p>
                <p>{business.description}</p>
            </div>
        )}

        {mapBar && (
            <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                    onClick={() => setMapBar(false)}
                >
                    ✕
                </button>
                <iframe
                    title="My Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={mapUrl}
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            </div>
        )}
    </div>
    );
};

export default VideoDisplay;
