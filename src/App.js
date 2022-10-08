import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Home, ItemDetail} from './screen';
import {ItemArView} from './screen/ItemArView';
import {Main} from './screen/Main';

const Stack = createNativeStackNavigator();

export function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          component={Main}
          name={'Main'}
          options={{headerShown: false}}
        />
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
        <Stack.Screen
          component={ItemArView}
          name={'ItemArView'}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
