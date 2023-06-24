import { Text, TouchableOpacity, View } from 'react-native';
import { Dispatch, FC, SetStateAction } from 'react';
import Svg, { Path } from 'react-native-svg';

export interface HeaderDropdownItem {
  label: string;
  id: string;
}
interface HeaderDropdownProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  items: HeaderDropdownItem[];
  onPressItem: (item: HeaderDropdownItem) => void;
  title: string;
}
const HeaderDropdown: FC<HeaderDropdownProps> = ({
  opened,
  setOpened,
  items = [],
  onPressItem: onPressItemFromProps,
  title,
}) => {
  const onPressItem = (item: HeaderDropdownItem) => {
    setOpened(false);
    onPressItemFromProps(item);
  };
  const onPressIcon = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row items-center"
        onPress={onPressIcon}
        activeOpacity={0.6}
      >
        <Text className="text-2xl dark:text-white font-bold">{title}</Text>
        <Svg
          className="ml-3 mt-2"
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
        >
          <Path
            d="M15 1L8 8L1 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
      {opened && (
        <View className="absolute top-16 w-72 left-3 bg-dark-element z-50 py-2 px-3 rounded-lg shadow-xl shadow-white shadow-black">
          {items.map((item, index) => (
            <TouchableOpacity
              onPress={() => onPressItem(item)}
              className="my-2"
              key={index}
            >
              <Text className="dark:text-white">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};
export default HeaderDropdown;
