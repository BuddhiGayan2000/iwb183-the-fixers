import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = screen => {
    navigation.navigate(screen);
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
        <Text style={styles.title}>Welcome to the Dashboard</Text>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigate('AvailableRequests')}>
            <Ionicons name="list-outline" size={25} color="white" />
            <Text style={styles.subtitle}>Available Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigate('AcceptedRequests')}>
            <Ionicons name="checkmark-done-outline" size={25} color="white" />
            <Text style={styles.subtitle}>Accepted Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigate('CompletedRequests')}>
            <Ionicons name="checkbox-outline" size={25} color="white" />
            <Text style={styles.subtitle}>Completed Requests</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomIconsWrapper}>
          <TouchableOpacity
            onPress={() => handleNavigate('Help')}
            style={styles.iconButton}>
            <Ionicons
              name="help-circle-outline"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigate('EditProfile')}
            style={styles.iconButton}>
            <Ionicons name="create-outline" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    zIndex: 4,
    marginBottom: 20,
    borderRadius: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: colors.darkgreen,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
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
    marginTop: 20,
    gap: 20,
    width: '100%',
  },
  buttonsWrapper: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomIconsWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.darkgreen,
  },
  iconButton: {
    padding: 10,
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
