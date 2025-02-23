import React, { useState } from "react";

const AddBusinessForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    hours: "",
    contacts: "",
    likes: 0,
    dislikes: 0,
  });
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send Business Data as JSON
      const response = await fetch("http://127.0.0.1:8000/api/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add business");
      }

      const data = await response.json();
      console.log("Business added:", data);
      setFormData({ name: "", description: "", location: "", hours: "", contacts: "", likes: 0, dislikes: 0 });
      setVideo(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding business.");
    }
  };

  return (
    <div>
      <h2>Add a New Business</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="hours" placeholder="Hours" value={formData.hours} onChange={handleChange} required />
        <input type="text" name="contacts" placeholder="Contacts" value={formData.contacts} onChange={handleChange} required />
        <input type="file" name="video" accept="video/*" required />
        <button type="submit">Add Business</button>
      </form>
    </div>
  );
};

export default AddBusinessForm;
