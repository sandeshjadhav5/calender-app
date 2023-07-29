// src/WeekView.tsx
import React, { useEffect, useState } from "react";
import { getEventsFromDB } from "./indexedDb";
import { generateStubData } from "./Data";

const WeekView: React.FC = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from IndexedDB or generate stub data if it's empty
    const fetchEvents = async () => {
      let eventData = await getEventsFromDB();
      if (eventData.length === 0) {
        eventData = generateStubData(20); // Generate 20 random events if DB is empty
      }
      setEvents(eventData);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Week View</h1>
    </div>
  );
};

export default WeekView;
