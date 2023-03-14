import {View} from "react-native";
import {Header} from "../store/header-store";
import PowerDisplay from "../components/PowerDisplay";

const DashboardScreen = () => {
    return (
        <View className='dark:bg-dark-main flex-1 pt-5'>
            <Header title='Dashboard'/>
            <View className='flex flex-row justify-around px-2'>
                <PowerDisplay power={0} text='Včeraj' classNameContainer='w-3/12'/>
                <PowerDisplay power={0} text='Danes' classNameContainer='w-3/12'/>
                <PowerDisplay power={0} text='Jutri' classNameContainer='w-3/12'/>
            </View>
        </View>
    )
}
export default DashboardScreen;