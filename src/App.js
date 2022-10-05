import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Home, ItemDetail} from './screen';

const Stack = createNativeStackNavigator();

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          component={Home}
          name={'Home'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ItemDetail}
          name={'ItemDetail'}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
