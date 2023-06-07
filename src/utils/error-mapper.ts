import {AuthError} from "firebase/auth";

export const firebaseAuthErrorMapper = (error: AuthError) => {
    if(error.code === 'auth/too-many-requests') {
        return 'Preveč poskusov prijave. Prosimo poizkusite kasneje.';
    }
    else
        return 'Vneseni podatki so napačni.'
}