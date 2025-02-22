import React, { useEffect, useState } from "react";
import { fetchItems } from "../api/api";

const VideoDisplay = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideoDisplay;
