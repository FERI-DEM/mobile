import {ScrollView, Text} from "react-native";
import Button from "./Button";
import useCommunityDeleteMutation from "../hooks/useCommunityDeleteMutation";
import {Routes} from "../navigation/routes";
import {navigate} from "../navigation/navigate";
import React from "react";
import {useCommunityStore} from "../store/community-store";
import useCommunity from "../hooks/useCommunity";
import MemberListItem from "./MemberListItem";


const CommunitySettingsTab = () => {
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);
    const {data: communityData} = useCommunity(selectedCommunity?.id || '', {enabled: !!selectedCommunity})
    const {mutate: deleteCommunity} = useCommunityDeleteMutation(selectedCommunity?.id || '', {
        onSuccess: () => navigate(Routes.DASHBOARD),
    })

    return (
        <ScrollView className='dark:bg-dark-main flex-1 px-3'>
            <Text className='dark:text-white mb-3 mt-4 ml-0.5'>Člani</Text>

            {!communityData ? <Text>Loading</Text> : communityData.members.map((member, index) => <MemberListItem
                member={member}
                communityId={communityData.id}
                key={index}/>)}
            <Text className='dark:text-white mb-3 mt-8 ml-0.5'>Dodatno</Text>
            <Button text='Izbriši' onPress={deleteCommunity} classname='bg-danger'/>
        </ScrollView>
    )
}
export default CommunitySettingsTab