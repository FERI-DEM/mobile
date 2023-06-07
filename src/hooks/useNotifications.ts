import {useEffect, useState} from "react";
import {useUserStore} from "../store/user-store";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {firebaseDatabase} from "../config/firebase";
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";
import {JoinCommunityNotification} from "../types/community.types";

const useNotifications = () => {
    const [notifications, setNotifications] = useState<JoinCommunityNotification[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToastStore();
    const user = useUserStore(state => state.user);

    const getNotifications = async () => {
        setLoading(true)
        try {
            const querySnapshot = await getDocs(query(collection(firebaseDatabase, "notifications"), where("receiverId", "==", user?.uid)));
            const notifications:JoinCommunityNotification[] = []
            querySnapshot.forEach((doc) => {
                notifications.push(doc.data() as JoinCommunityNotification)
            });
            setNotifications(notifications.length === 0 ? undefined : notifications)
            setLoading(false)
        }catch (e) {
            showToast('Nekaj je šlo narobe pri pridobivanju obvestil', ToastTypes.ERROR)
            setLoading(false)
        }
    }

    const subscribeToNotifications = () => {
        const q = query(collection(firebaseDatabase, "notifications"), where("receiverId", "==", user?.uid));
        return onSnapshot(q, (querySnapshot) => {
            const notifications:JoinCommunityNotification[] = []
            querySnapshot.forEach((doc) => {
                notifications.push(doc.data() as JoinCommunityNotification)
            });
            setNotifications(notifications.length === 0 ? undefined : notifications)
        });
    }

    useEffect(() => {
        getNotifications()
        const unsubscribe = subscribeToNotifications()
        return () => unsubscribe()
    }, []);
    return {data: notifications, isLoading: loading};
}
export default useNotifications;