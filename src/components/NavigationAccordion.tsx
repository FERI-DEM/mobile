import {Text, TouchableOpacity, View} from "react-native";
import {ReactNode, useState} from "react";
import {ChevronDownIcon} from "react-native-heroicons/solid";
import {Routes} from "../navigation/routes";

export interface NavigationAccordionItem<T> {
    title: string
    route?: Routes
    onPressItem: (item: NavigationAccordionItem<T>) => void
    icon: ReactNode
}
export interface NavigationAccordionProps<T> {
    item: NavigationAccordionItem<T> & {
        onPressItem?: (item: NavigationAccordionItem<T>) => void
        subItems?: NavigationAccordionItem<T>[]
    }
}
const NavigationAccordion = <T extends string> ({item}: NavigationAccordionProps<T>) => {
    const [isOpened, setIsOpened] = useState(false)
    const onPressItem = () => {
        console.log(item.onPressItem)
        setIsOpened(prevState => !prevState)
        !item.subItems && item.onPressItem?.(item)
    }
    return <View>
        <TouchableOpacity className='my-2 flex flex-row items-center'
                          onPress={() => onPressItem()}>
            <View className='w-4 h-4'>
                {item.icon}
            </View>
            <Text className='ml-3 mb-0.5 text-white text-md font-bold mr-3'>{item.title}</Text>
            {item.subItems && <ChevronDownIcon size={16} color='white'/>}
        </TouchableOpacity>
        {isOpened && <View className='flex flex-col'>
            {item.subItems?.map((item, index) => <TouchableOpacity key={index} className='my-2 ml-3 flex flex-row items-center'
                                                           onPress={() => {
                                                               console.log(item.onPressItem)
                                                               item.onPressItem?.(item)}
                                                           }>
                <View className='w-4 h-4'>
                    {item.icon}
                </View>
                <Text className='ml-2 mb-0.5 text-white text-xs'>{item.title}</Text>
            </TouchableOpacity>)}
        </View>}
    </View>
}
export default NavigationAccordion