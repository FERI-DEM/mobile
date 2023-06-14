import { apiInstance } from './axios';
import { User } from '../types/user.types';

const UsersService = {
  getUser: async () => {
    const response = await apiInstance.get<User>('users/me');
    return response.data;
  },
};

export default UsersService;
