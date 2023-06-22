import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user-store';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { firebaseDatabase } from '../config/firebase';
import { JoinCommunityNotification } from '../types/community.types';

const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<JoinCommunityNotification[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);

  const subscribeToNotifications = () => {
    setLoading(true);
    setNotifications(undefined)
    const q = query(
      collection(firebaseDatabase, 'notifications'),
      where('receiverId', '==', user?.uid),
      where('processed', '==', false),
    );
    return onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if(change.type === 'added')
          setNotifications(prevState => {
            const notifications = [change.doc.data() as JoinCommunityNotification, ...(prevState || [])]
            if(notifications.length === 0) return undefined
            return notifications.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          })
        else if(change.type === 'removed')
            setNotifications(prevState => {
              const filtered = prevState?.filter(n => n.id !== change.doc.id) || []
                if(filtered.length === 0) return undefined
                return filtered
            })
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = subscribeToNotifications();
    return () => unsubscribe();
  }, []);
  return { data: notifications, isLoading: loading };
};
export default useNotifications;
