import React, { useState } from 'react';
import { createEvent } from '../services/eventService';

function EventForm({ onEventCreated }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const newEvent = await createEvent({ name: eventName, date: eventDate });
    console.log('New event:', newEvent);
    setEventName('');
    setEventDate('');
    if (onEventCreated) {
      onEventCreated(newEvent);
    }
  };

  return (
    <div className="event-form">
      <h2>Create Event</h2>
      <form onSubmit={handleEventSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Date (YYYY-MM-DD)"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
