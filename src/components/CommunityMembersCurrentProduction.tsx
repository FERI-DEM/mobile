import MemberProductionListItem from "./MemberProductionListItem";
import {roundToTwoDecimalPlaces} from "../utils/power";
import React from "react";
import useCommunityMembersCurrentProduction from "../hooks/useCommunityMembersCurrentProduction";
import {useCommunityStore} from "../store/community-store";
import DataView from "./DataView";
import useUser from "../hooks/useUser";
import {ScrollView, View} from "react-native";
import Skeleton from "./Skeleton";

const CommunityMembersCurrentProduction = () => {
    const selectedCommunity = useCommunityStore(
        (state) => state.selectedCommunity
    );
    const {
        data: membersCurrentProduction,
        isFetching: isFetchingMembersCurrentProduction,
    } = useCommunityMembersCurrentProduction(selectedCommunity?.id || '', {
        enabled: !!selectedCommunity,
        retry: false,
    });
    const {data: user} = useUser();

    return <DataView
        isLoading={isFetchingMembersCurrentProduction}
        data={membersCurrentProduction}
        loadingComponent={<Skeleton classNameContainer={'shadow-lg shadow-black dark:bg-dark-element'}>
            <View className='border-l-2 border-l-dark-skeleton-content h-16 w-full bg flex flex-row justify-between px-5 items-center border-b-2 border-b-dark-main'>
                <View className='bg-dark-skeleton-content w-32 h-5'></View>
                <View className='bg-dark-skeleton-content w-14 h-5'></View>
            </View>
            <View className='border-l-2 border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center border-b-2 border-b-dark-main'>
                <View className='bg-dark-skeleton-content w-32 h-5'></View>
                <View className='bg-dark-skeleton-content w-14 h-5'></View>
            </View>
            <View className='border-l-2 border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center'>
                <View className='bg-dark-skeleton-content w-32 h-5'></View>
                <View className='bg-dark-skeleton-content w-14 h-5'></View>
            </View>
        </Skeleton>}
    >
        {(membersCurrentProduction) => (
                <ScrollView className='max-h-56' nestedScrollEnabled>
                    {membersCurrentProduction?.powerPlants.map((powerPlant, index) => (
                            <MemberProductionListItem
                                member={powerPlant.username + ' ~ ' + powerPlant.displayName}
                                power={roundToTwoDecimalPlaces(powerPlant.production.power)}
                                active={user?.id === powerPlant.userId}
                                key={index}
                            />
                        )
                    )}
                </ScrollView>
        )}
    </DataView>
}
export default CommunityMembersCurrentProduction;