import * as z from "zod";

export const CreateCommunityDataSchema = z.object({
    communityName: z.string().min(3, { message: "Ime vaše energetske skupnosti mora biti daljše od 3 znakov" }).max(20, { message: "Ime vaše energijske skupnosti ne sme biti daljše od 20 znakov" }),
    powerPlants: z.array(z.object({
        powerPlantId: z.string(),
    })).min(1, { message: "Dodati je potrebno vsaj eno elektrarno" })
});
