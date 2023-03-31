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

export interface CommunityRes {
//TODO: add types
    community: Community;
}