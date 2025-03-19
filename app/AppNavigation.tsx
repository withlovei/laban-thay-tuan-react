import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import UserInformationScreen from './user-information';
import MapScreen from './map';
import SplashScreen from 'react-native-splash-screen';

// Define the root stack parameter list
export type RootStackParamList = {
  UserInformation: undefined;
  Map: undefined;
  Tabs: undefined;
  NotFound: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="UserInformation">
        <Stack.Screen 
          name="UserInformation" 
          component={UserInformationScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
