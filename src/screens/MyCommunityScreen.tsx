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
    const [toggleView, setToggleView] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);

    const form = useForm({
        resolver: zodResolver(InviteMemberDataSchema),
        defaultValues: DefaultMemberData
    });

    const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
        console.log({data});
        //mutate(data);
    };

    return (
        <View className='dark:bg-dark-main flex-1 pt-5'>
            <View className='flex flex-row px-7 gap-5 mb-4'>
                <Text className={`text-white opacity-40 ${!toggleView && 'text-tint opacity-100'}`} onPress={() => {setToggleView(false); console.log('sem na podatkih')}}>Podatki</Text>
                <Text className={`text-white opacity-40 ${toggleView && 'text-tint opacity-100'}`} onPress={() => setToggleView(true)}>Člani</Text>
            </View>
            {
                !toggleView ? (
                    <View className='flex flex-row justify-around px-2'>
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