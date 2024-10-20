import React from 'react'
import 'react-native-get-random-values';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignUpScreen2 from './screens/SignUpScreen2'
import SignUpScreen3 from './screens/SignUpScreen3';
import HomeScreen2 from './screens/HomeScreen2'
import MainDashScreen from './screens/MainDashScreen'
import PickupOverviewScreen from './screens/PickupOverviewScreen'
import AvailableRequests from './screens/AvailableRequestsScreen';
import AcceptedRequests from './screens/AcceptedRequestsScreen';
import CompletedRequests from './screens/CompletedRequestsScreen';
import SplashScreen from './screens/SplashScreen';

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
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
        <Stack.Screen name="SignUp3" component={SignUpScreen3}/>
        <Stack.Screen name="MainDash" component={MainDashScreen} />
        <Stack.Screen name="PickupOverview" component={PickupOverviewScreen} />
        <Stack.Screen name="AvailableRequests"component={AvailableRequests}/>
        <Stack.Screen name="AcceptedRequests"component={AcceptedRequests}/>
        <Stack.Screen name="CompletedRequests"component={CompletedRequests}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
