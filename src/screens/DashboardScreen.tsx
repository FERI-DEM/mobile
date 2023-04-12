import {ScrollView, View} from "react-native";
import PowerDisplay from "../components/PowerDisplay";
import LineChart from "../components/LineChart";
import AlertCard from "../components/AlertCard";
import Svg, {Path} from "react-native-svg";

const DashboardScreen = () => {
    const data = [
        {x: 10, y: 20},
        {x: 20, y: 50},
        {x: 30, y: 10},
        {x: 40, y: 20},
        {x: 50, y: 30},
        {x: 60, y: 10},
    ]
    return (
        <ScrollView className='dark:bg-dark-main flex-1 pt-5'>
            <View className='flex flex-row justify-around'>
                <PowerDisplay power={15} text='Danes' classNameContainer='w-3/12'/>
                <PowerDisplay power={22} text='Jutri' classNameContainer='w-3/12'/>
                <PowerDisplay power={10} text='Pojutrišnjem' classNameContainer='w-3/12'/>
            </View>
            <View className='px-4 py-6'>
                <LineChart/>
            </View>
            <View>
                <Svg viewBox='0 0 60 60' style={{width: 300, height: 300}}>
                    {data.map((item, i) => {
                        if(i !== data.length - 1) return <Path
                            fill="red"
                            stroke="#F18F37"
                            strokeWidth="0.5"
                            key={i}
                            d={`M${item.x},${item.y} C${item.x + 5},${item.y} ${data[i + 1].x - 5},${data[i + 1].y} ${data[i + 1].x},${data[i + 1].y}`}/>
                    })}
                    <Path d="M 10 10 C 10 10, 20 50, 30 10 C 40 50, 30 10, 40 50" stroke="black" fill="none"/>
                </Svg>
            </View>
            <AlertCard title={'Obvestilo'} message={'Padec energije čez 1h.'} />
        </ScrollView>
    )
}
export default DashboardScreen;