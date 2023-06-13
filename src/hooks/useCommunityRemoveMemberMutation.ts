import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CommunityService from '../api/community.service';
import { MutationKey } from '../types/keys.types';

const useCommunityRemoveMemberMutation = (
  id: string,
  memberId: string,
  powerPlantId: string,
  options?: UseMutationOptions<unknown, AxiosError>
) =>
  useMutation<unknown, AxiosError>(
    [MutationKey.REMOVE_MEMBER_FROM_COMMUNITY],
    () => CommunityService.removeCommunityMember(id, memberId, powerPlantId),
    options
  );

export default useCommunityRemoveMemberMutation;
