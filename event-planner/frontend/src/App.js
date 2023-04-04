import React from 'react';
import './App.css';
import EventList from './components/EventList';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <h1>Event Planner</h1>
      <EventList />
      <UserList />
    </div>
  );
}

export default App;
