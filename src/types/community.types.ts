import * as z from "zod";
import {CreateCommunityDataSchema} from "../schemas/community.schema";

export type CreateCommunityDataType = z.infer<typeof CreateCommunityDataSchema>

interface Community {
    name: string;
    membersIds: string[];
    members: object[];
    adminId: string;
}

export interface CommunityReq {
    name: string;
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