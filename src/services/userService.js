const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async getUsers() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  },
  async getUserById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  }
};