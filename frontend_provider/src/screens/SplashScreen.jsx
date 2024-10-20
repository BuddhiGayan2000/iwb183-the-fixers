import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';

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
    <LinearGradient
        colors={['#FAFA6E', '#23AA8F']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0.8}}>
        <View style={styles.topSquare1}></View>
        <View style={styles.topSquare2}></View>
        <View style={styles.loadingContainer}>
          <Image
            source={require('../assets/original.png')}
            style={styles.Loadinglogo}
          />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  topSquare1: {
    width: 300,
    height: 170,
    backgroundColor: '#23AA8F',
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.5,
    top: -20,
    right: -70,
    zIndex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    transform: [{rotate: '20deg'}],
    shadowOffset: {width: 0, height: 5},
  },
  topSquare2: {
    width: 400,
    height: 140,
    backgroundColor: '#23AA8F',
    opacity: 0.5,
    borderRadius: 20,
    position: 'absolute',
    top: -40,
    right: -100,
    zIndex: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    transform: [{rotate: '20deg'}],
    shadowOffset: {width: 0, height: 5},
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Loadinglogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100,
  },
});
