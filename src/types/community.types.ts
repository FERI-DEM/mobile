import * as z from "zod";
import {CreateCommunityDataSchema} from "../schemas/community.schema";

export type CreateCommunityDataType = z.infer<typeof CreateCommunityDataSchema>