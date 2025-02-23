import React, { useEffect, useState } from "react";

const VideoDisplay = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Move to the next business
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % businesses.length);
  };

  if (businesses.length === 0) {
    return <p>Loading businesses...</p>;
  }

  const business = businesses[currentIndex];
  const videoUrl = `http://127.0.0.1:8000/static/videos/file${business.video}.mp4`;

  return (
    <div>
      <h2>Business Details</h2>
      <h3>{business.name}</h3>
      <p>Location: {business.location}</p>
      <p>Coordinates: ({business.latitude}, {business.longitude})</p>
      <p>Video ID: {business.video}</p>

      {business.video && (
        <video key={videoUrl} width="320" height="240" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <button onClick={handleNext}>Next Business</button>
    </div>
  );
};

export default VideoDisplay;
