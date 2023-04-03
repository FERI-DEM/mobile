import {TouchableOpacity, Text, Image} from "react-native";
import useGoogleAuth from "../hooks/useGoogleAuth";
import GoogleIcon from "../assets/images/google-icon.png";

const GoogleLoginButton = () => {
    const {promptAsync} = useGoogleAuth()
    return <TouchableOpacity className='bg-white px-5 py-3 w-1/2 justify-center items-center flex flex-row shadow-lg shadow-white rounded-md' onPress={() => promptAsync()}>
        <Image source={GoogleIcon} className='w-5 h-5 mr-2'/>
        <Text className='font-bold'>Google </Text>
    </TouchableOpacity>
}
export default GoogleLoginButton