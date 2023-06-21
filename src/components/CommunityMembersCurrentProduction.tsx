import MemberProductionListItem from "./MemberProductionListItem";
import {roundToTwoDecimalPlaces} from "../utils/power";
import React from "react";
import useCommunityMembersCurrentProduction from "../hooks/useCommunityMembersCurrentProduction";
import {useCommunityStore} from "../store/community-store";
import DataView from "./DataView";
import useUser from "../hooks/useUser";
import {ScrollView, View} from "react-native";
import Skeleton from "./Skeleton";
import ProductionListSkeleton from "./ProductionListSkeleton";

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
        loadingComponent={<ProductionListSkeleton/>}
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