const API_URL = 'http://localhost:3002';

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    throw new Error(await response.text());
  }
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
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
      throw new Error(errorData.message || 'Failed to delete user');
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to delete user');
    }
  }
}
