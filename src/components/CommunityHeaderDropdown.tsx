import {Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import useCommunities from "../hooks/useCommunities";
import Svg, {Path} from "react-native-svg";
import {useCommunityStore} from "../store/community-store";

const CommunityHeaderDropdown = () => {
    const [opened, setOpened] = useState(false);
    const {data: communities} = useCommunities();
    const setSelectedCommunity = useCommunityStore(state => state.setSelectedCommunity);

    console.log(communities)
    const toggleOpen = () => {
        setOpened(prevState => !prevState);
    }

    return <>
        <TouchableOpacity onPress={toggleOpen}>
            <Svg className='ml-3 mt-2' width="16" height="9" viewBox="0 0 16 9" fill="none">
                <Path d="M15 1L8 8L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </TouchableOpacity>
        {opened && <View
            className='absolute top-14 w-72 -left-1 bg-dark-element z-50 py-2 px-3 rounded-lg shadow-xl shadow-white shadow-black'>
            {communities?.map((community, index) => <TouchableOpacity onPress={() => setSelectedCommunity({id: community._id, name: community.name})} className='my-2' key={index}><Text
                className='text-white'>{community.name}</Text></TouchableOpacity>)}
        </View>}
    </>
}
export default CommunityHeaderDropdown;