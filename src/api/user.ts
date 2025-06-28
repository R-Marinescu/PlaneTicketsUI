import api from '../lib/axios';

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log('✅ API data:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
