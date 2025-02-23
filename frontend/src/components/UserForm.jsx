import React, { useState } from "react";

const UserForm = () => {
    const [location, setLocation] = useState("")

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

    } catch (error) {
        console.error("Error:", error);
        alert("Error adding business.");
    }
    };

return(

    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="location" 
            placeholder="Enter location" 
            value={location}
            onChange={handleChange} 
            required 
        />
        <button type="submit">Send Location</button>
    </form>

)}
export default UserForm