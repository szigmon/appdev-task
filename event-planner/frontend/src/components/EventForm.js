import React, { useState } from 'react';
import { createEvent } from '../services/eventService';
import { createUser } from '../services/userService';

function EventForm({ onEventCreated, onUserCreated }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');

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

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser({ username: userName, email: userEmail, fullName: userFullName });
    console.log('New user:', newUser);
    setUserName('');
    setUserEmail('');
    setUserFullName('');
    if (onUserCreated) {
      onUserCreated(newUser);
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
      <h2>Create User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={userFullName}
          onChange={(e) => setUserFullName(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default EventForm;
