import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
    const [location, setLocation] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLocation(e.target.value); // Fix: Correctly update state
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(location)
    try {
        // Step 1: Send Business Data as JSON
        const response = await fetch("http://127.0.0.1:8000/api/display/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'location':location}),
        });
        navigate("/");

    } catch (error) {
        console.error("Error:", error);
        alert("Error adding business.");
    }
    };

return(

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Enter Your Location
    </h2>
    <p className="text-gray-700 mb-6 text-center max-w-md">
        Use this page to submit your location. This helps us find the closest businesses near you.
    </p>

    <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-md"
    >
        <input 
            type="text" 
            name="location" 
            placeholder="Enter location" 
            value={location}
            onChange={handleChange} 
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
            type="submit" 
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
            Find
        </button>
    </form>
</div>
)}
export default UserForm