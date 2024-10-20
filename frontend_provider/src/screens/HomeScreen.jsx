import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Home2');
  };
  return (
    <LinearGradient
      colors={['#FAFA6E', '#23AA8F']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.8}}>
      <View style={styles.topSquare1}></View>
      <View style={styles.topSquare2}></View>
      <View style={styles.container}>
        <Image source={require('../assets/original.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome Collector!</Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: {
    width: 270,
    height: 270,
    marginBottom: 50,
    borderRadius: 200,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5}
  },
  title: {
    fontSize: 36,
    color: colors.darkgreen,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2A4858',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    position: 'absolute',  
    bottom: 40,           
    alignSelf: 'center',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    shadowOffset: { width: 0, height: 5 },
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
    shadowOffset: { width: 0, height: 5 },
}
});
