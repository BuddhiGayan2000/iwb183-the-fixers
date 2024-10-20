import React from 'react'
import 'react-native-get-random-values';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen2 from './screens/HomeScreen2'
import MainDashScreen from './screens/MainDashScreen'
import PickupOverviewScreen from './screens/PickupOverviewScreen'
import SplashScreen from './screens/SplashScreen';
import CreatePickupRequest from './screens/CreatePickupRequestScreen';
import TrackRequestsScreen from './screens/TrackRequestsScreen';
import PickupHistoryScreen from './screens/PickupHistoryScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainDash" component={MainDashScreen} />
        <Stack.Screen name="PickupOverview" component={PickupOverviewScreen} />
        <Stack.Screen name="CreatePickupRequest" component={CreatePickupRequest}/>
        <Stack.Screen name="TrackRequests" component={TrackRequestsScreen}/>
        <Stack.Screen name="PickupHistory" component={PickupHistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
