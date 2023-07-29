// src/WeekView.tsx
import React, { useEffect, useState } from "react";
import { getEventsFromDB } from "./indexedDb";
import { generateStubData } from "./Data";
import { format, addDays } from "date-fns"; // You can use date-fns library for date manipulation

const WeekView: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, -7));
  };

  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(format(addDays(weekStart, i), "yyyy-MM-dd"));
    }

    return days;
  };

  const getEventsForDay = (day: string) => {
    return events.filter((event) => format(event.date, "yyyy-MM-dd") === day);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Week View</h1>
      <div className="flex items-center mb-4">
        <button
          className="px-2 py-1 mr-2 border rounded"
          onClick={handlePreviousWeek}
        >
          Previous Week
        </button>
        <button className="px-2 py-1 border rounded" onClick={handleNextWeek}>
          Next Week
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {getWeekDays().map((day) => (
          <div key={day} className="border rounded p-4">
            <h2 className="text-lg font-bold mb-2">
              {format(new Date(day), "EEEE")}
            </h2>
            {getEventsForDay(day).map((event, index) => (
              <div key={index} className="mb-2">
                <span className="text-sm font-bold">{event.title}</span>
                <span className="text-xs ml-1">({event.duration} hrs)</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
