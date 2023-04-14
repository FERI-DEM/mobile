import {View} from "react-native";
import Button from "../components/Button";
import {auth} from "../config/firebase";
import {signOut} from 'firebase/auth'

const SettingsScreen = () => {
    const logout = () => {
        signOut(auth)
    }
    return <View className='flex-1 bg-dark-main px-3 pt-5'>
        <Button text='Logout' onPress={logout} classname='bg-danger'/>
    </View>
}
export default SettingsScreen