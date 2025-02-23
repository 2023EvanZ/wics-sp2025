import { useState, useEffect } from "react";
import axios from "axios";
import './MoreSidebar.css';

const MoreSidebar = ({ businessId, onClose }) => {
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (businessId) {
            axios.get(`http://127.0.0.1:8000/api/business/${businessId}/`)
                .then(response => {
                    setBusiness(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Business not found.");
                    setLoading(false);
                });
        }
    }, [businessId]);

    return (
        <div className={`sidebar ${businessId ? "open" : ""}`}>
            <button className="close-btn" onClick={onClose}>X</button>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>{business.name}</h2>
                    <p><strong>Location:</strong> {business.location}</p>
                    <p><strong>Hours:</strong> {business.hours}</p>
                    <p><strong>Contact:</strong> {business.contact_info}</p>
                    <p>{business.description}</p>
                </div>
            )}
        </div>
    );
};

export default MoreSidebar;