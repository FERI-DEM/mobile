import * as z from "zod";

export const BaseRegisterSchema = z.object({
    email: z.string().min(1, { message: "Elektronski naslov je obvezen" }).email({
        message: "Vpisan elektronski naslov ni veljaven"
    }),
    password: z.string().min(6, { message: "Geslo mora vsebovati vsaj 6 znakov" }),
    confirmPassword: z.string().min(6, { message: "Geslo mora vsebovati vsaj 6 znakov" }),
});

export const AddPowerPlantSchema = z.object({
    powerPlantName: z.string().min(3, { message: "Ime elektrarne mora biti dolgo vsaj 3 znake" }).max(20, { message: "Ime elektrarne ne sme biti daljše od 20 znakov" }),
    location: z.string().min(1, { message: "Location must be at least 1 character long" }),
    maxPower: z.number().min(1, { message: "Maksimalna moč mora biti večja od 0" }),
    size: z.number().min(1, { message: "Velikost elektrarne mora biti večja od 0" }),
});

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Elektronski naslov je obvezen" }).email({
        message: "Vpisan elektronski naslov ni veljaven"
    }),
    password: z.string().min(6, { message: "Geslo mora vsebovati vsaj 6 znakov" }),
})

export const ChangePasswordSchema = z.object({
    password: z.string().min(6, { message: "Geslo mora vsebovati vsaj 6 znakov" }),
    confirmPassword: z.string().min(6, { message: "Geslo mora vsebovati vsaj 6 znakov" }),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().min(1, { message: "Elektronski naslov je obvezen" }).email({
        message: "Vpisan elektronski naslov ni veljaven"
    })
});