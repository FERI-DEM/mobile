import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSideMenuStore } from '../store/side-menu-store';
import { useMemo, useState } from 'react';
import HeaderDropdown, {
  HeaderDropdownItem,
} from '../components/HeaderDropdown';
import { usePowerPlantStore } from '../store/power-plant-store';
import usePowerPlants from '../hooks/usePowerPlants';

const HeaderBarPowerPlants = () => {
  const { selectedPowerPlant, setSelectedPowerPlant } = usePowerPlantStore(
    (state) => ({
      selectedPowerPlant: state.selectedPowerPlant,
      setSelectedPowerPlant: state.setSelectedPowerPlant,
    })
  );
  const { toggleOpened } = useSideMenuStore();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const { data: powerPlants } = usePowerPlants();
  const dropdownItems = useMemo(
    () =>
      powerPlants?.map((powerPlant) => ({
        label: powerPlant.displayName,
        id: powerPlant._id,
      })) || [],
    [powerPlants]
  );

  const onPressDropdownItem = (item: HeaderDropdownItem) => {
    setSelectedPowerPlant({ name: item.label, id: item.id });
  };

  const toggleDropdown = () => {
    setDropdownOpened((prevState) => !prevState);
  };

  return (
    <View className="flex justify-between items-center flex-row dark:bg-dark-main p-4">
      <HeaderDropdown
        opened={dropdownOpened}
        setOpened={setDropdownOpened}
        onPressItem={onPressDropdownItem}
        items={dropdownItems}
        title={selectedPowerPlant.name}
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
export default HeaderBarPowerPlants;
