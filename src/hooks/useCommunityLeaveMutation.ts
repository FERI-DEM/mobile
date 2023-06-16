import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CommunityService from '../api/community.service';
import { MutationKey } from '../types/keys.types';

const useCommunityLeaveMutation = (
  id: string,
  powerPlantId: string,
  options?: UseMutationOptions<unknown, AxiosError>
) =>
  useMutation<unknown, AxiosError>(
    [MutationKey.LEAVE_COMMUNITY],
    () => CommunityService.leaveCommunity(id, powerPlantId),
    options
  );

export default useCommunityLeaveMutation;
