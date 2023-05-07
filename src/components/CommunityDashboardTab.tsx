import PowerDisplay from "./PowerDisplay";
import {ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import MemberProductionListItem from "./MemberProductionListItem";

const members = [
    {
        name: 'Janez Novak',
        power: 1,
    },
    {
        name: 'Peter Pero',
        power: 102000,
    },
    {
        name: 'Mujo Haso',
        power: 2000,
    },
]

const CommunityDashboardTab = () => {
    const [active, setActive] = useState<number>(0);

    return (
        <View className='flex-1 pt-5 dark:bg-dark-main'>
            <View className='flex flex-row justify-around px-4'>
                <PowerDisplay power={15} text='Danes' classNameContainer='w-1/3 pr-2'/>
                <PowerDisplay power={22} text='Jutri' classNameContainer='w-1/3 px-1'/>
                <PowerDisplay power={10} text='Pojutrišnjem' classNameContainer='w-1/3 pl-2'/>
            </View>

            <ScrollView className='my-5 mx-4 flex'>
                <Text className='text-white mb-2'>Proizvodnja članov</Text>
                {members.map((member, index) => {
                    return <MemberProductionListItem member={member.name} power={member.power} onPress={() => setActive(index)}
                                                     active={active === index} key={index}/>
                })}
            </ScrollView>
        </View>
    )
}
export default CommunityDashboardTab