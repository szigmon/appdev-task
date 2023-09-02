import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/eventService';
import EventForm from './EventForm';

function EventList() {
  const [events, setEvents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    fetchEvents();
  }, [refreshKey]);

  const handleEventCreated = (newEvent) => {
    setRefreshKey((prevKey) => prevKey + 1);
    console.log('New event:', newEvent);
  };

  const handleEventDeleted = (deletedEventId) => {
    setRefreshKey((prevKey) => prevKey + 1);
    console.log(`Event with ID ${deletedEventId} deleted.`);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    handleEventDeleted(id);
  };

  return (
    <div className="event-list">
      <h2>Events</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EventForm onEventCreated={handleEventCreated} />
    </div>
  );
}

export default EventList;
