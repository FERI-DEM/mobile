import * as z from "zod";

export const CalibrationDataSchema = z.object({
    production: z.coerce.number().min(0, { message: "Proizvodnja ne more biti manjša od 0kW"}).max(1000000, { message: "Proizvodnja ne more biti višja od 1000000kW" }),
});