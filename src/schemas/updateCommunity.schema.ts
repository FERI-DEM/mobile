import * as z from 'zod';

export const UpdateCommunitySchema = z.object({
  name: z.string(),
});
