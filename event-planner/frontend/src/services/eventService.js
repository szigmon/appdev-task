const API_URL = 'http://localhost:3001';

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);
  return response.json();
}

export async function createEvent(event) {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      throw new Error(await response.text());
    }
  }
  
// Delete an event by id
export async function deleteEvent(id) {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });
  
    const contentType = response.headers.get('Content-Type');
  
    if (response.ok) {
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return null;
      }
    } else {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete event');
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete event');
      }
    }
  }
  