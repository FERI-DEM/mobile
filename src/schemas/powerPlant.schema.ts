import * as z from "zod";

export const UpdatePowerPlantDataSchema = z.object({
    name: z.string()
});