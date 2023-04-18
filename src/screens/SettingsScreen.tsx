import {View} from "react-native";
import Button from "../components/Button";
import {auth} from "../config/firebase";
import {signOut} from 'firebase/auth'
import Input from "../components/Input";

const SettingsScreen = () => {
    const logout = () => {
        signOut(auth).catch((err) => {
            console.log(err)
        })
    }
    return (
        <View className='flex-1 bg-dark-main px-3 pt-5'>
            <Input label={'nekaj'} value={'nekaj'} onChangeText={() => {}}/>
            <Button text='Logout' onPress={logout} classname='bg-danger'/>
        </View>
    );
}
export default SettingsScreen