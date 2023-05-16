import {useUserStore} from "../store/user-store";


export function useAuthentication() {
    const {userState, user, setUserState, setUser} = useUserStore();



    return {
        user, userState
    };
}