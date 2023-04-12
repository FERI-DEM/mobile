import * as z from "zod";

export const InviteMemberDataSchema = z.object({
    name: z.string()
});