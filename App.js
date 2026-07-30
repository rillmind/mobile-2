import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Details from './src/pages/Details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#0f392b" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f392b'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
          },
          headerShadowVisible: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Conheça Garanhuns'
          }}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Detalhes do Local'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
