import React, {FC, useEffect, useRef} from "react";
import {Text} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";

const Toast: FC = () => {
    const translateY = useSharedValue(0);
    const toastRef = useRef(null);

    const { isVisible, text, type } = useToastStore();

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

    const getToastBackgroundColor = (type: ToastTypes) => {
        switch (type) {
            case ToastTypes.SUCCESS:
                return "bg-tint";
            case ToastTypes.ERROR:
                return "bg-red-500";
            case ToastTypes.INFORMATION:
                return "bg-amber-400";
            default:
                return "bg-stone-500";
        }
    };

    return (
        <>
            {isVisible && (
                <Animated.View ref={toastRef} className={`${getToastBackgroundColor(type)} p-4 absolute bottom-0 w-full items-center`} style={animatedStyle}>
                    <Text className='dark:text-white text-center'>{text}</Text>
                </Animated.View>
            )}
        </>
    );
};

export default Toast;
