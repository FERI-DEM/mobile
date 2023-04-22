import {useEffect, useState} from "react";
import { User } from 'firebase/auth';
import {auth} from "../config/firebase";

export function useAuthentication() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setLoading(true)
        const unsubscribeFromAuthStatusChanged = auth.onAuthStateChanged((user) => {
            setLoading(false)
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatusChanged;
    }, []);

    return {
        user, loading
    };
}