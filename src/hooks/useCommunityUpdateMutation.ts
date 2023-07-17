import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MutationKey } from '../types/keys.types';
import { Community, CommunityUpdate } from '../types/community.types';
import CommunityService from '../api/community.service';

const useCommunityUpdateMutation = (
  id: string,
  options?: UseMutationOptions<Community, AxiosError, CommunityUpdate>
) =>
  useMutation<Community, AxiosError, CommunityUpdate>(
    [MutationKey.UPDATE_POWER_PLANT],
    (community) => CommunityService.update(community, id),
    options
  );

export default useCommunityUpdateMutation;
