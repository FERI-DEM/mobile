import {useCommunityStore} from '../store/community-store';
import HeaderBar from "./HeaderBar";

const HeaderBarCommunities = () => {
    const selectedCommunity = useCommunityStore((state) => state.selectedCommunity);

    return (
        <HeaderBar title={selectedCommunity?.name || ''}/>
    );
};
export default HeaderBarCommunities;
