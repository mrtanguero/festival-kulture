import axios from 'axios';

const usersAPI = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default usersAPI;
