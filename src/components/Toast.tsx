import {FC, useRef} from "react";
import React, {  useEffect  } from 'react';
import { Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import {useToastStore} from "../store/toast-store";

const Toast: FC = () => {
    const translateY = useSharedValue(0);
    const toastRef = useRef(null);

    const { isVisible, text } = useToastStore();

    useEffect(() => {
        if (isVisible) {
            translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
            setTimeout(() => {
                hideToast();
            }, 1000);
        } else {
            translateY.value = withSpring(300, { damping: 10, stiffness: 100 });
        }
    }, [isVisible]);

    const hideToast = () => {
        translateY.value = withSpring(300, { damping: 10, stiffness: 100 }, () => {
            runOnJS(useToastStore.setState)({ isVisible: false });
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(isVisible ? 0 : 300) }],
        };
    });

    return (
        <>
            {isVisible && (
                <Animated.View ref={toastRef} className='bg-tint p-4 absolute bottom-0 w-full items-center' style={animatedStyle}>
                    <Text className='text-white text-center'>{text}</Text>
                </Animated.View>
            )}
        </>
    );
};

export default Toast;
