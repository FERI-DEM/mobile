import {TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useSideMenuStore} from '../store/side-menu-store';
import {useEffect, useMemo, useState} from 'react';
import {useCommunityStore} from '../store/community-store';
import HeaderDropdown, {HeaderDropdownItem,} from '../components/HeaderDropdown';
import useCommunities from '../hooks/useCommunities';

const HeaderBarCommunities = () => {
  const { selectedCommunity, setSelectedCommunity } = useCommunityStore(
    (state) => ({
      selectedCommunity: state.selectedCommunity,
      setSelectedCommunity: state.setSelectedCommunity,
    })
  );
  const { toggleOpened } = useSideMenuStore();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const { data: communities } = useCommunities();
  const dropdownItems = useMemo(
    () =>
      communities?.map((community) => ({
        label: community.name,
        id: community._id,
      })) || [],
    [communities]
  );

  const onPressDropdownItem = (item: HeaderDropdownItem) => {
    setSelectedCommunity({ name: item.label, id: item.id });
  };

  useEffect(() => {
      if(communities && communities.length > 0)
        setSelectedCommunity({name: communities?.[0].name, id: communities?.[0]._id})
  }, [communities])

  return (
    <View className="flex justify-between items-center flex-row dark:bg-dark-main p-4">
      <HeaderDropdown
        opened={dropdownOpened}
        setOpened={setDropdownOpened}
        onPressItem={onPressDropdownItem}
        items={dropdownItems}
        title={selectedCommunity?.name || ''}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={toggleOpened}
        className="pt-1.5"
      >
        <View className="w-7 h-7">
          <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <Path
              d="M4 6H20M4 10H20M4 14H20M4 18H20"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default HeaderBarCommunities;
