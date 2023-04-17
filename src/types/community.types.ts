import * as z from "zod";
import {CreateCommunityDataSchema} from "../schemas/community.schema";
import {InviteMemberDataSchema} from "../schemas/organizationUser.schema";

export type CreateCommunityDataType = z.infer<typeof CreateCommunityDataSchema>
export type InviteMemberDataType = z.infer<typeof InviteMemberDataSchema>

interface Community {
    name: string;
    membersIds: string[];
    members: object[];
    adminId: string;
}

export interface CommunityReq {
   name: string;
    powerPlants: {powerPlantId: string, powerPlantName: string}[]
}

interface CommunityMember {
    id: string;
    name: string;
    powerPlantName: string;
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