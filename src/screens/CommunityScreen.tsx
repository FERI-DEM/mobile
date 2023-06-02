import React, {FC, useState} from 'react';
import {Text, View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InviteMemberDataSchema} from "../schemas/organizationUser.schema";
import {CreateCommunityDataType, InviteMemberDataType} from "../types/community.types";
import CreateCommunityTab from "../components/CreateCommunityTab";
import CommunitySettingsTab from "../components/CommunitySettingsTab";
import CommunityDashboardTab from "../components/CommunityDashboardTab";
import {CommunityTab, useCommunityTabsStore} from '../store/community-tabs-store';
import Tabs from "../components/Tabs";
import {QueryBoundaries} from "../components/QueryBoundaries";
import {useCommunityStore} from "../store/community-store";



const DefaultMemberData: InviteMemberDataType = {
    name: '',
}

const CommunityScreen: FC = () => {
    const {activeTab, setActiveTab} = useCommunityTabsStore(state => state)
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity)
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
            <QueryBoundaries isLoading={!selectedCommunity}>
                <Tabs activeTab={activeTab} tabs={Object.values(CommunityTab)} onClickTab={setActiveTab}/>
                {activeTab === CommunityTab.DASHBOARD && <CommunityDashboardTab />}
                {activeTab === CommunityTab.SETTINGS && <CommunitySettingsTab />}
                {activeTab === CommunityTab.CREATE_COMMUNITY && <CreateCommunityTab />}
            </QueryBoundaries>
        </View>
    );
};

export default CommunityScreen;