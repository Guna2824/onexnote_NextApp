"use client"

import React, { useState, useEffect } from 'react';

const EventReminder = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const baseEvents = [
    { name: 'New Year', date: '01-01' },
    { name: 'Valentine\'s Day', date: '02-14' },
    { name: 'Easter', date: '04-20' },
    { name: 'Halloween', date: '10-31' },
    { name: 'Christmas', date: '12-25' }
  ];

  const calculateUpcomingEvents = () => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const processedEvents = baseEvents.map(event => {
      const eventDate = new Date(`${event.date}-${currentYear}`);
      if (eventDate < now) {
        eventDate.setFullYear(currentYear + 1);
      }

      return {
        ...event,
        fullDate: eventDate
      };
    }).sort((a, b) => (a.fullDate?.getTime() || 0) - (b.fullDate?.getTime() || 0));

    return processedEvents;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const events = calculateUpcomingEvents();
      setUpcomingEvents(events);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      const eventToCheck = selectedEvent 
        ? upcomingEvents.find(e => e.name === selectedEvent)
        : upcomingEvents[0];

      if (eventToCheck && eventToCheck.fullDate) {
        const now = new Date();
        const diff = eventToCheck.fullDate.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          setRemainingTime(
            `${days}d ${hours}h ${minutes}m ${seconds}s remaining`
          );
        } else {
          setRemainingTime('The event is happening now!');
        }
      }
    }
  }, [selectedEvent, currentTime, upcomingEvents]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-4 relative overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-shadow-md">Upcoming Events</h1>
        <p className="text-lg font-light opacity-80">Today's Date: {currentTime.toLocaleDateString()}</p>
      </div>

      <div className="w-full max-w-2xl z-10">
        <h2 className="text-2xl text-center font-semibold mb-4">Upcoming Events:</h2>
        <ul className="list-none p-0">
          {upcomingEvents.map((event, index) => (
            <li
              key={event.name}
              className={`bg-white bg-opacity-10 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 mb-3 cursor-pointer flex justify-between items-center text-white hover:scale-105 transition-all ${
                selectedEvent === event.name ? 'bg-green-500 font-semibold' : ''
              }`}
              onClick={() => setSelectedEvent(event.name)}
            >
              {index === 0 ? '🔥 ' : ''}{event.name}: {event.fullDate?.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center z-10">
        {upcomingEvents.length > 0 && (
          <>
            <h3 className="text-2xl mb-4">Next Event: {upcomingEvents[0].name}</h3>
            <p className="text-xl font-light bg-black bg-opacity-20 px-6 py-3 rounded-lg">{remainingTime}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EventReminder;
