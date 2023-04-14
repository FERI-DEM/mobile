import React, {FC, useState} from 'react';
import {Text, View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InviteMemberDataSchema} from "../schemas/organizationUser.schema";
import {CreateCommunityDataType, InviteMemberDataType} from "../types/community.types";
import CreateCommunityTab from "../components/CreateCommunityTab";
import CommunitySettingsTab from "../components/CommunitySettingsTab";
import CommunityDashboardTab from "../components/CommunityDashboardTab";

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

export enum CommunityTabs {
    DASHBOARD = 'dashboard',
    SETTINGS = 'settings',
    CREATE_COMMUNITY = 'create',
}


const DefaultMemberData: InviteMemberDataType = {
    name: '',
}

const MyCommunityScreen: FC = () => {
    const [activeTab, setActiveTab] = useState<CommunityTabs>(CommunityTabs.DASHBOARD);

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
            <View className='flex flex-row px-5 gap-5 mb-4'>
                {Object.values(CommunityTabs).map((tab, index) => <Text key={index}
                                                                        className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`}
                                                                        onPress={() => setActiveTab(tab)}>{tab}</Text>)}
            </View>
            {
                activeTab === CommunityTabs.DASHBOARD ? <CommunityDashboardTab/> : activeTab === CommunityTabs.SETTINGS ? <CommunitySettingsTab/> : <CreateCommunityTab/>

            }
        </View>
    );
};

export default MyCommunityScreen;