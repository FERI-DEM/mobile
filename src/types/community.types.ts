import * as z from 'zod';
import {
  CreateCommunityDataSchema,
  JoinCommunityDataSchema,
} from '../schemas/community.schema';
import { InviteMemberDataSchema } from '../schemas/organizationUser.schema';
import { NotificationType } from './common.types';
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

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
  community: string;
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
export interface CommunityMonthlyPowerProductionRes {
  from: string;
  to: string;
  powerPlants: {
    from: string;
    to: string;
    powerPlantId: string;
    email: string;
    production: number;
  }[];
  production: number;
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
  createdAt: Timestamp;
}

export interface JoinCommunityRequestProcess {
  notificationId: string;
  accepted: boolean;
}

export interface CommunityUpdate {
  name: string;
}

export interface CommunityCurrentProductionRes {
  powerPlants: CommunityCurrentProduction[];
  production: number;
}

export interface CommunityCurrentProduction {
  username: string;
  userId: string;
  powerPlantId: string;
  displayName: string;
  production: {
    date: string;
    power: number;
  };
}
