import React, {FC} from 'react';
import {View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InviteMemberDataSchema} from "../schemas/organizationUser.schema";
import {CreateCommunityDataType, InviteMemberDataType} from "../types/community.types";
import CreateCommunityTab from "../components/CreateCommunityTab";
import CommunitySettingsTab from "../components/CommunitySettingsTab";
import CommunityDashboardTab from "../components/CommunityDashboardTab";
import {CommunityTab, useCommunityTabsStore} from '../store/community-tabs-store';
import Tabs from "../components/Tabs";

const memberList = [
    {
        member: 'Član1',
        power: 23,
    },
    {
        member: 'Član2',
        power: 5,
    },
    {
        member: 'Član3',
        power: 12,
    },
    {
        member: 'Član4',
        power: 100,
    },]



const DefaultMemberData: InviteMemberDataType = {
    name: '',
}

const MyCommunityScreen: FC = () => {
    const {activeTab, setActiveTab} = useCommunityTabsStore(state => state)
    const form = useForm({
        resolver: zodResolver(InviteMemberDataSchema),
        defaultValues: DefaultMemberData
    });

    const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
        console.log({data});
        //mutate(data);
    };

    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <Tabs activeTab={activeTab} tabs={Object.values(CommunityTab)} onClickTab={setActiveTab}/>

            {activeTab === CommunityTab.DASHBOARD && <CommunityDashboardTab />}
            {activeTab === CommunityTab.SETTINGS && <CommunitySettingsTab />}
            {activeTab === CommunityTab.CREATE_COMMUNITY && <CreateCommunityTab />}
        </View>
    );
};

export default MyCommunityScreen;