import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

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

  const formatLocation = (location) => {
    const parts = location.split(/,(.+)/);
    const street = parts[0]?.replace(/\+/g, " ") || "";
    const cityState = parts[1]?.split(",")[0]?.replace(/\+/g, " ") || "";
    const country = parts[1]?.split(",")[1]?.replace(/\+/g, " ") || "";

    return (
        <span>
            <span className="font-semibold">{street}</span>, 
            <span className="text-gray-600"> {cityState}</span>, 
            <span className="text-gray-600"> {country}</span>
        </span>
    );
  };

  if (loading) {
    return <p>Loading top businesses...</p>;
  }

  return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Top Businesses</h2>

          <ul className="w-full max-w-3xl space-y-6">
              {topBusinesses.map((business) => (
                  <li key={business.id} className="bg-white shadow-md p-6 rounded-lg border border-gray-300">
                      <h3 className="text-2xl font-semibold text-gray-800">{business.name}</h3>
                      <p className="text-gray-600 mt-1"><strong>Location:</strong> {formatLocation(business.location)}</p>
                      <p className="text-gray-700 mt-1">
                          <strong>Likes:</strong> <span className="text-green-600">{business.likes}</span> |
                          <strong> Dislikes:</strong> <span className="text-red-600">{business.dislikes}</span>
                      </p>
                      <p className="text-gray-700 mt-3">{business.description}</p>
                  </li>
              ))}
          </ul>

          <div className="mt-6">
              <LogoutButton />
          </div>
      </div>
  );
};

export default TopBusinesses;
