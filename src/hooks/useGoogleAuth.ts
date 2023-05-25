import * as Google from 'expo-auth-session/providers/google';
import {useEffect} from "react";
import * as WebBrowser from "expo-web-browser";
import firebase from "firebase/compat";
import {signInWithCredential} from "firebase/auth";
import {auth} from "../config/firebase";
import {GOOGLE_CLIENT_ID, ANDROID_CLIENT_ID} from "@env";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID
    })


    const signIn = async () => {
        try{
            if (response?.type === 'success') {
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    response.authentication?.idToken,
                    response.authentication?.accessToken
                );

                await signInWithCredential(auth, credential);
                navigate(Routes.DASHBOARD)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        signIn()
    }, [response])

    return {promptAsync}
}
export default useGoogleAuth