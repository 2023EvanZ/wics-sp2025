import React, { useEffect, useState } from "react";

const TopBusinesses = () => {
  const [topBusinesses, setTopBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBusinesses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/top/");
        if (!response.ok) {
          throw new Error("Failed to fetch top businesses");
        }
        const data = await response.json();
        setTopBusinesses(data);
      } catch (error) {
        console.error("Error fetching top businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBusinesses();
  }, []);

  if (loading) {
    return <p>Loading top businesses...</p>;
  }

  return (
    <div>
      <h2>Top Businesses</h2>
      <ul>
        {topBusinesses.map((business) => (
          <li key={business.id}>
            <h3>{business.name}</h3>
            <p>Location: {business.location}</p>
            <p>Likes: {business.likes} | Dislikes: {business.dislikes}</p>
            <p>Description: {business.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBusinesses;
