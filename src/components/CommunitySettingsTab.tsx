import {ScrollView} from "react-native";
import Button from "./Button";
import useCommunityDeleteMutation from "../hooks/useCommunityDeleteMutation";
import {Routes} from "../navigation/routes";
import {navigate} from "../navigation/navigate";
import React from "react";
import {useCommunityStore} from "../store/community-store";
import useCommunity from "../hooks/useCommunity";
import MemberListItem from "./MemberListItem";


const CommunitySettingsTab = () => {
    const {id: selectedCommunityID} = useCommunityStore(state => state.selectedCommunity);
    const {data: communityData} = useCommunity(selectedCommunityID)
    const {mutate: deleteCommunity} = useCommunityDeleteMutation(selectedCommunityID, {
        onSuccess: () => navigate(Routes.DASHBOARD)
    })
    return (
        <ScrollView className='dark:bg-dark-main flex-1 px-3'>
            {communityData?.members.map((member, index) => <MemberListItem
                text={`${member.name}/${member.powerPlantName}`} key={index}/>)}
            <Button text='Izbriši' onPress={deleteCommunity} classname='bg-danger'/>
        </ScrollView>
    )
}
export default CommunitySettingsTab