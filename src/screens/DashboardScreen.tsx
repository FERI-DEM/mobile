import {ScrollView, View} from "react-native";
import PowerDisplay from "../components/PowerDisplay";
import LineChart from "../components/LineChart";
import AlertCard from "../components/AlertCard";
import LineChart2 from "../components/LineChart2";

const DashboardScreen = () => {

    return (
        <ScrollView>
        <View className='dark:bg-dark-main flex-1 pt-5'>
            <View className='flex flex-row justify-around'>
                <PowerDisplay power={15} text='Danes' classNameContainer='w-3/12'/>
                <PowerDisplay power={22} text='Jutri' classNameContainer='w-3/12'/>
                <PowerDisplay power={10} text='Pojutrišnjem' classNameContainer='w-3/12'/>
            </View>
            <View className='my-6 m-4 shadow-lg shadow-black rounded-xl dark:bg-dark-element'>
                <LineChart2 />
            </View>
            <View className='px-4 py-6'>
                <LineChart />
            </View>
            <AlertCard title={'Obvestilo'} message={'Padec energije čez 1h.'} />
        </View>
        </ScrollView>
    )
}
export default DashboardScreen;