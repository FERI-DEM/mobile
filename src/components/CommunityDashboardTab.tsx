import PowerDisplay from "./PowerDisplay";
import {ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import MemberProductionListItem from "./MemberProductionListItem";
import {useCommunityStore} from "../store/community-store";
import useCommunity from "../hooks/useCommunity";

const CommunityDashboardTab = () => {
    const [active, setActive] = useState<number>(0);
    const {id: selectedCommunityID} = useCommunityStore(state => state.selectedCommunity);
    const {data: communityData} = useCommunity(selectedCommunityID);

    return (
        <View className='flex-1 pt-5 dark:bg-dark-main'>
            <View className='flex flex-row justify-around px-4'>
                <PowerDisplay power={15} text='Danes' classNameContainer='w-1/3 pr-2'/>
                <PowerDisplay power={22} text='Jutri' classNameContainer='w-1/3 px-1'/>
                <PowerDisplay power={10} text='Pojutrišnjem' classNameContainer='w-1/3 pl-2'/>
            </View>

            <ScrollView className='my-5 mx-4 flex'>
                <Text className='text-white mb-2'>Proizvodnja članov</Text>
                {communityData?.members.map((member, index) => {
                    return <MemberProductionListItem member={member.userName} power={100}
                                                     onPress={() => setActive(index)}
                                                     active={active === index} key={index}/>
                })}
            </ScrollView>
        </View>
    )
}
export default CommunityDashboardTab