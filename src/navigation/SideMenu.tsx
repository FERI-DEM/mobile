import {TouchableOpacity, View} from "react-native";
import {Routes} from "./routes";
import {navigate} from "./navigate";
import {useEffect, useMemo} from "react";
import Svg, {Path} from "react-native-svg";
import {useSideMenuStore} from "../store/side-menu-store";
import SideMenuLogo from "./SideMenuLogo";
import NavigationAccordion, {NavigationAccordionItem} from "../components/NavigationAccordion";
import {PlusCircleIcon, UserPlusIcon} from "react-native-heroicons/mini";
import {UserGroupIcon} from "react-native-heroicons/solid";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

type SideMenuSubItem = Omit<NavigationAccordionItem<Routes>, 'onPressItem'>
interface SideMenuItem extends SideMenuSubItem {
    subItems?: SideMenuSubItem[]
}
export const sideMenuItems: SideMenuItem[] = [
    {
        title: 'Elektrarne',
        icon: <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
            <Path
                d="M1 2.5C1 2.10218 1.15804 1.72064 1.43934 1.43934C1.72064 1.15804 2.10218 1 2.5 1H4C4.39782 1 4.77936 1.15804 5.06066 1.43934C5.34196 1.72064 5.5 2.10218 5.5 2.5V4C5.5 4.39782 5.34196 4.77936 5.06066 5.06066C4.77936 5.34196 4.39782 5.5 4 5.5H2.5C2.10218 5.5 1.72064 5.34196 1.43934 5.06066C1.15804 4.77936 1 4.39782 1 4V2.5ZM8.5 2.5C8.5 2.10218 8.65804 1.72064 8.93934 1.43934C9.22064 1.15804 9.60218 1 10 1H11.5C11.8978 1 12.2794 1.15804 12.5607 1.43934C12.842 1.72064 13 2.10218 13 2.5V4C13 4.39782 12.842 4.77936 12.5607 5.06066C12.2794 5.34196 11.8978 5.5 11.5 5.5H10C9.60218 5.5 9.22064 5.34196 8.93934 5.06066C8.65804 4.77936 8.5 4.39782 8.5 4V2.5ZM1 10C1 9.60218 1.15804 9.22064 1.43934 8.93934C1.72064 8.65804 2.10218 8.5 2.5 8.5H4C4.39782 8.5 4.77936 8.65804 5.06066 8.93934C5.34196 9.22064 5.5 9.60218 5.5 10V11.5C5.5 11.8978 5.34196 12.2794 5.06066 12.5607C4.77936 12.842 4.39782 13 4 13H2.5C2.10218 13 1.72064 12.842 1.43934 12.5607C1.15804 12.2794 1 11.8978 1 11.5V10ZM8.5 10C8.5 9.60218 8.65804 9.22064 8.93934 8.93934C9.22064 8.65804 9.60218 8.5 10 8.5H11.5C11.8978 8.5 12.2794 8.65804 12.5607 8.93934C12.842 9.22064 13 9.60218 13 10V11.5C13 11.8978 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8978 13 11.5 13H10C9.60218 13 9.22064 12.842 8.93934 12.5607C8.65804 12.2794 8.5 11.8978 8.5 11.5V10Z"
                stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>,
        subItems: [
            {
                title: 'Nadzorna plošča',
                route: Routes.DASHBOARD,
                icon: <UserGroupIcon size={15} color='white'/>
            },
            {
                title: 'Dodaj elektrarno',
                route: Routes.ADD_POWER_PLANT,
                icon: <PlusCircleIcon color='white' size={15}/>
            }
        ]
    },
    {
        title: 'Sporočila',
        route: Routes.NOTIFICATIONS,
        icon: <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
            <Path
                d="M1 2.5C1 2.10218 1.15804 1.72064 1.43934 1.43934C1.72064 1.15804 2.10218 1 2.5 1H4C4.39782 1 4.77936 1.15804 5.06066 1.43934C5.34196 1.72064 5.5 2.10218 5.5 2.5V4C5.5 4.39782 5.34196 4.77936 5.06066 5.06066C4.77936 5.34196 4.39782 5.5 4 5.5H2.5C2.10218 5.5 1.72064 5.34196 1.43934 5.06066C1.15804 4.77936 1 4.39782 1 4V2.5ZM8.5 2.5C8.5 2.10218 8.65804 1.72064 8.93934 1.43934C9.22064 1.15804 9.60218 1 10 1H11.5C11.8978 1 12.2794 1.15804 12.5607 1.43934C12.842 1.72064 13 2.10218 13 2.5V4C13 4.39782 12.842 4.77936 12.5607 5.06066C12.2794 5.34196 11.8978 5.5 11.5 5.5H10C9.60218 5.5 9.22064 5.34196 8.93934 5.06066C8.65804 4.77936 8.5 4.39782 8.5 4V2.5ZM1 10C1 9.60218 1.15804 9.22064 1.43934 8.93934C1.72064 8.65804 2.10218 8.5 2.5 8.5H4C4.39782 8.5 4.77936 8.65804 5.06066 8.93934C5.34196 9.22064 5.5 9.60218 5.5 10V11.5C5.5 11.8978 5.34196 12.2794 5.06066 12.5607C4.77936 12.842 4.39782 13 4 13H2.5C2.10218 13 1.72064 12.842 1.43934 12.5607C1.15804 12.2794 1 11.8978 1 11.5V10ZM8.5 10C8.5 9.60218 8.65804 9.22064 8.93934 8.93934C9.22064 8.65804 9.60218 8.5 10 8.5H11.5C11.8978 8.5 12.2794 8.65804 12.5607 8.93934C12.842 9.22064 13 9.60218 13 10V11.5C13 11.8978 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8978 13 11.5 13H10C9.60218 13 9.22064 12.842 8.93934 12.5607C8.65804 12.2794 8.5 11.8978 8.5 11.5V10Z"
                stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    },
    {
        title: 'Skupnosti',
        icon: <UserGroupIcon size={15} color='white'/>,
        subItems: [
            {
                title: 'Skupnosti',
                route: Routes.ORGANIZATION,
                icon: <UserGroupIcon size={15} color='white'/>
            },
            {
                title: 'Ustvari skupnost',
                route: Routes.ADD_COMMUNITY,
                icon: <UserPlusIcon color='white' size={15}/>
            },
            {
                title: 'Pridružitev',
                route: Routes.JOIN_COMMUNITY,
                icon: <UserPlusIcon color='white' size={15}/>
            }
        ]

    },
    {
        title: 'Nastavitve',
        route: Routes.SETTINGS,
        icon: <Svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <Path
                d="M9.56999 6.47001C9.58999 6.32001 9.59999 6.16501 9.59999 6.00001C9.59999 5.84001 9.58999 5.68001 9.56499 5.53001L10.58 4.74001C10.67 4.67001 10.695 4.53501 10.64 4.43501L9.67999 2.77501C9.61999 2.66501 9.49499 2.63001 9.38499 2.66501L8.18999 3.14501C7.93999 2.95501 7.67499 2.79501 7.37999 2.67501L7.19999 1.40501C7.17999 1.28501 7.07999 1.20001 6.95999 1.20001H5.03999C4.91999 1.20001 4.82499 1.28501 4.80499 1.40501L4.62499 2.67501C4.32999 2.79501 4.05999 2.96001 3.81499 3.14501L2.61999 2.66501C2.50999 2.62501 2.38499 2.66501 2.32499 2.77501L1.36999 4.43501C1.30999 4.54001 1.32999 4.67001 1.42999 4.74001L2.44499 5.53001C2.41999 5.68001 2.39999 5.84501 2.39999 6.00001C2.39999 6.15501 2.40999 6.32001 2.43499 6.47001L1.41999 7.26001C1.32999 7.33001 1.30499 7.46501 1.35999 7.56501L2.31999 9.22501C2.37999 9.33501 2.50499 9.37001 2.61499 9.33501L3.80999 8.85501C4.05999 9.04501 4.32499 9.20501 4.61999 9.32501L4.79999 10.595C4.82499 10.715 4.91999 10.8 5.03999 10.8H6.95999C7.07999 10.8 7.17999 10.715 7.19499 10.595L7.37499 9.32501C7.66999 9.20501 7.93999 9.04501 8.18499 8.85501L9.37999 9.33501C9.48999 9.37501 9.61499 9.33501 9.67499 9.22501L10.635 7.56501C10.695 7.45501 10.67 7.33001 10.575 7.26001L9.56999 6.47001ZM5.99999 7.80001C5.00999 7.80001 4.19999 6.99001 4.19999 6.00001C4.19999 5.01001 5.00999 4.20001 5.99999 4.20001C6.98999 4.20001 7.79999 5.01001 7.79999 6.00001C7.79999 6.99001 6.98999 7.80001 5.99999 7.80001Z"
                fill="white"/>
        </Svg>
    },

];

const SideMenu = () => {
    const {opened, toggleOpened} = useSideMenuStore()
    const translateX = useSharedValue(200);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const onPressItem = (item: SideMenuSubItem) => {
        toggleOpened()
        item.route && navigate(item.route)
    }

    const items = useMemo(() => sideMenuItems.map(item => ({...item, onPressItem: () => onPressItem(item), subItems: item.subItems?.map(subItem => ({...subItem, onPressItem: () => onPressItem(subItem) }))})), [])

    useEffect(() => {
        translateX.value = withTiming(opened ? 0 : 200, { duration: 200 });
    }, [opened]);

    return (
        <View className='absolute w-full h-full'>
            <View className='relative w-full h-full flex items-end'>
                {opened && <TouchableOpacity className='w-full h-full absolute opacity-50 bg-black'
                                   onPress={() => toggleOpened()}/>}
                <Animated.View className='w-[200px] dark:bg-dark-main h-full items-center pt-9' style={animatedStyle}>
                    <SideMenuLogo />
                    <View className='w-full px-7'>
                        {items.map((item, index) => <NavigationAccordion item={item} key={index}/>)}
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}
export default SideMenu;