import * as z from 'zod';
import {
  CreateCommunityDataSchema,
  JoinCommunityDataSchema,
} from '../schemas/community.schema';
import { InviteMemberDataSchema } from '../schemas/organizationUser.schema';
import { NotificationType } from './common.types';

export type CreateCommunityDataType = z.infer<typeof CreateCommunityDataSchema>;
export type JoinCommunityDataType = z.infer<typeof JoinCommunityDataSchema>;
export type InviteMemberDataType = z.infer<typeof InviteMemberDataSchema>;

export interface Community {
  _id: string;
  name: string;
  membersIds: string[];
  members: object[];
  adminId: string;
}

export interface CommunityReq {
  name: string;
  powerPlants: { powerPlantId: string }[];
}

export interface CommunityReqJoin {
  communityId: string;
  powerPlants: string[];
}

export interface CommunityMember {
  userId: string;
  powerPlantName: string;
  powerPlantId: string;
  userName: string;
  isAdmin: boolean;
}
export interface CommunityRes {
  name: string;
  membersIds: string[];
  members: CommunityMember[];
  adminId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  community: Community;
}
export interface CommunityMembersPowerShareRes {
  user: string;
  share: number;
}
export interface JoinCommunityNotification {
  id: string;
  receiverId: string;
  senderId: string;
  type: NotificationType;
  data: {
    communityId: string;
    userId: string;
    powerPlants: string[];
    message: string;
  };
  processed: boolean;
  createdAt: string;
}

export interface JoinCommunityRequestProcess {
  notificationId: string;
  accepted: boolean;
}

export interface CommunityUpdate {
  name: string;
}
