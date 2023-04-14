import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import PowerDisplay from "../components/PowerDisplay";
import MemberListItem from "../components/MemberListItem";
import InputWithIcon from "../components/InputWithIcon";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateCommunityDataSchema} from "../schemas/community.schema";
import {InviteMemberDataSchema} from "../schemas/organizationUser.schema";
import {CreateCommunityDataType, InviteMemberDataType} from "../types/community.types";
import {useCommunityStore} from "../store/community-store";
import useCommunity from "../hooks/useCommunity";

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
    const {id: selectedCommunityID} = useCommunityStore(state => state.selectedCommunity);
    const {data: communityData} = useCommunity(selectedCommunityID)

    console.log(communityData)

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
                {Object.values(CommunityTabs).map((tab, index) => <Text key={index} className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`} onPress={() => setActiveTab(tab)}>{tab}</Text>)}
            </View>
            {
                activeTab === CommunityTabs.DASHBOARD ? (
                    <View className='flex flex-row justify-around'>
                        <PowerDisplay power={0} text='Včeraj' classNameContainer='w-3/12'/>
                        <PowerDisplay power={0} text='Danes' classNameContainer='w-3/12'/>
                        <PowerDisplay power={0} text='Jutri' classNameContainer='w-3/12'/>
                    </View>
                ) : (
                    <View>
                        <ScrollView className='px-7'>
                            {memberList.map((member, index) => {
                                return <MemberListItem member={member.member} power={member.power} onPress={() => setActive(index)} active={active === index} key={index}/>
                            })}
                            <FormProvider {...form}>
                                <InputWithIcon iconText="Poišči" label="Povabi člana" name="name" />
                            </FormProvider>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
};

export default MyCommunityScreen;