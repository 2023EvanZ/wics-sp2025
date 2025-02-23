import React from "react";
import './MapSidebar.css';

// require('dotenv').config();

const MapSidebar = ({ businessLocation, onClose }) => {
    if (!businessLocation) {
        return null;
    }

    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_EMBED_MAP_KEY;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=`;
    //const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(businessLocation)}`;

    return (
        <div className="map-sidebar open">
            <button className="close-btn" onClick={onClose}>X</button>
            <iframe
                title="My Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default MapSidebar;