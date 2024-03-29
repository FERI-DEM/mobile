import { TouchableOpacity, View } from 'react-native';
import { Routes } from './routes';
import { navigate } from './navigate';
import { ReactNode, useEffect, useMemo } from 'react';
import { useSideMenuStore } from '../store/side-menu-store';
import SideMenuLogo from './SideMenuLogo';
import NavigationAccordion from '../components/NavigationAccordion';
import { UserPlusIcon } from 'react-native-heroicons/mini';
import { UserGroupIcon } from 'react-native-heroicons/solid';
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
} from 'react-native-heroicons/outline';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import usePowerPlants from '../hooks/usePowerPlants';
import useCommunities from '../hooks/useCommunities';
import IconWithText from '../components/IconWithText';
import { useCommunityStore } from '../store/community-store';
import { usePowerPlantStore } from '../store/power-plant-store';
import { PowerPlant } from '../types/powerPlant.types';
import { CommunityRes } from '../types/community.types';

interface SideMenuSubRoute {
  title: string;
  icon: ReactNode;
  route: Routes;
}
interface SideMenuItem {
  title: string;
  icon: ReactNode;
  route: Routes;
}
interface SideMenuGroup {
  title: string;
  icon: ReactNode;
  route?: Routes;
  subRoutes?: SideMenuSubRoute[];
  items?: SideMenuItem[];
}
export const sideMenuGroups: SideMenuGroup[] = [
  {
    title: 'Elektrarne',
    icon: <Squares2X2Icon color="orange" size={20} />,
    subRoutes: [
      {
        title: 'Ustvari elektrarno',
        route: Routes.ADD_POWER_PLANT,
        icon: <SquaresPlusIcon color="#236BFE" size={15} />,
      },
    ],
  },
  {
    title: 'Sporočila',
    route: Routes.NOTIFICATIONS,
    icon: <EnvelopeIcon color="#63B38A" size={20} />,
  },
  {
    title: 'Skupnosti',
    icon: <UserGroupIcon size={20} color="#FBDD73" />,
    subRoutes: [
      {
        title: 'Ustvari skupnost',
        route: Routes.ADD_COMMUNITY,
        icon: <PlusCircleIcon color="#236BFE" size={15} />,
      },
      {
        title: 'Pridružitev',
        route: Routes.JOIN_COMMUNITY,
        icon: <UserPlusIcon color="#FBDD73" size={15} />,
      },
    ],
  },
  {
    title: 'Nastavitve',
    route: Routes.SETTINGS,
    icon: <Cog6ToothIcon color="#CF4C6C" size={20} />,
  },
];

const SideMenu = () => {
  const { opened, toggleOpened, setOpened } = useSideMenuStore();
  const targetSize = 220;
  const translateX = useSharedValue(targetSize);
  const { data: powerPlants } = usePowerPlants();
  const { data: communities } = useCommunities();
  const setSelectedCommunity = useCommunityStore(
    (state) => state.setSelectedCommunity
  );
  const setSelectedPowerPlant = usePowerPlantStore(
    (state) => state.setSelectedPowerPlant
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const animatedOpacity = useAnimatedStyle(() => ({
    display: translateX.value === targetSize ? 'none' : 'flex',
    opacity: interpolate(translateX.value, [0, targetSize], [0.5, 0]),
  }));
  const animatedRootViewStyle = useAnimatedStyle(() => ({
    zIndex: translateX.value === targetSize ? -10 : 10,
  }));

  const onPressGroup = (group: SideMenuGroup) => {
    if (group.route) {
      toggleOpened();
      navigate(group.route);
    }
  };

  const onPressSubRoute = (subRoute: SideMenuSubRoute) => {
    toggleOpened();
    navigate(subRoute.route);
  };

  const onPressPowerPlantItem = (powerPlant: PowerPlant) => {
    toggleOpened();
    setSelectedPowerPlant({ id: powerPlant._id, name: powerPlant.displayName });
    navigate(Routes.DASHBOARD);
  };
  const onPressCommunityItem = (community: CommunityRes) => {
    toggleOpened();
    setSelectedCommunity({ id: community._id, name: community.name });
    navigate(Routes.ORGANIZATION);
  };

  const createSideMenuGroupItems = (group: SideMenuGroup) => {
    if (group.title === 'Elektrarne') {
      return powerPlants?.map((powerPlant, index) => ({
        title: powerPlant.displayName,
        route: Routes.DASHBOARD,
        icon: (
          <IconWithText
            icon={<Squares2X2Icon color="#EDBE44" size={15} />}
            text={`${index + 1}`}
          />
        ),
        onPress: () => onPressPowerPlantItem(powerPlant),
      }));
    }
    if (group.title === 'Skupnosti') {
      return communities?.map((community, index) => ({
        title: community.name,
        route: Routes.ORGANIZATION,
        icon: (
          <IconWithText
            icon={<UserGroupIcon size={15} color="#D2C184" />}
            text={`${index + 1}`}
          />
        ),
        onPress: () => onPressCommunityItem(community),
      }));
    }
  };

  const groups = useMemo(
    () =>
      sideMenuGroups.map((group) => ({
        ...group,
        onPress: () => onPressGroup(group),
        subRoutes: group.subRoutes?.map((subRoute) => ({
          ...subRoute,
          onPress: () => onPressSubRoute(subRoute),
        })),
        items: createSideMenuGroupItems(group),
      })),
    [powerPlants, communities]
  );

  useEffect(() => {
    translateX.value = withTiming(opened ? 0 : targetSize, { duration: 200 });
  }, [opened]);

  return (
    <Animated.View
      style={animatedRootViewStyle}
      className="absolute w-full h-full"
    >
      <View className="relative w-full h-full flex items-end">
        {
          <Animated.View
            style={animatedOpacity}
            className="w-full h-full absolute bg-black"
          >
            <TouchableOpacity
              activeOpacity={1}
              className="w-full h-full bg-black"
              onPress={() => setOpened(false)}
            />
          </Animated.View>
        }
        <Animated.View
          className={`w-[220px] dark:bg-dark-main h-full items-center pt-9`}
          style={animatedStyle}
        >
          <SideMenuLogo />
          <View className="w-full px-5">
            {groups.map((group, index) => (
              <NavigationAccordion group={group} key={index} />
            ))}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default SideMenu;
