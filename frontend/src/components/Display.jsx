import React, { useEffect, useState } from "react";
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

      <button className="open-btn" onClick={() => setSideBar(true)}>More</button>
      {sideBar && (
        <div className={`sidebar open`}>
        <button className="close-btn" onClick={() => setSideBar(false)}>X</button>
        <h2>{business.name}</h2>
        <p><strong>Location:</strong> {business.location}</p>
        <p><strong>Hours:</strong> {business.hours}</p>
        <p><strong>Contact:</strong> {business.contact_info}</p>
        <p>{business.description}</p>
      </div>
      )}
      <button className="open-btn" onClick={() => setMapBar(true)}>Map</button>
      {mapBar && (
        <div className="map-sidebar open">
        <button className="close-btn" onClick={() => setMapBar(false)}>X</button>
        <iframe
            title="My Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={mapUrl}
            allowFullScreen
        ></iframe>
      </div>
      )}
      <LogoutButton />
      <Votes businessId={business.id}/>
    </div>
  );
};

export default VideoDisplay;
