import { QueryKey } from '../types/keys.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '../types/common.types';
import usersService from '../api/users.service';
import { User } from '../types/user.types';

const useUser = (options?: UseQueryOptions<User, ApiError>) =>
  useQuery<User, ApiError>(
    [QueryKey.USER],
    () => usersService.getUser(),
    options
  );
export default useUser;
