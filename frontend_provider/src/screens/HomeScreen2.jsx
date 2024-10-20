import {

  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen2 = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate('SignUp');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
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
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={handleGoBack}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <Image source={require('../assets/original.png')} style={styles.logo} />
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonContainer}>
            <Ionicons name="person-add-outline" size={25} color="white" />
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.subtitle}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Ionicons name="person-circle-outline" size={25} color="white" />
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.subtitle}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
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
    shadowOffset: {width: 0, height: 5},
  },
  title: {
    fontSize: 40,
    color: colors.darkgreen,
    marginTop: 40,
    fontWeight: 'bold',
  },
  TextContainer: {
    marginBottom: 0,
  },
  Text: {
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: colors.darkgreen,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 30,
    width: '100%',
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    color: colors.white,
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
});
