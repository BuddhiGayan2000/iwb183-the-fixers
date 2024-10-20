import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.replace('MainDash');
        } else {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.replace('Home');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/original.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
    borderRadius: 100
  },
});