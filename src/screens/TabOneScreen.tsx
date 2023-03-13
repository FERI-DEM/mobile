import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import Button from "../components/Button";
import {useColorScheme} from "nativewind";
import Input from "../components/Input";
import {useState} from "react";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [value, setValue] = useState('Nekaj');
  return (
    <View style={styles.container} className={'bg-dark-main px-5'}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button text='Nekaj' onPress={toggleColorScheme}/>
      <Input label='Nekaj' value={value} onChangeText={setValue} placeholder={'fdgkdfkgh'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
