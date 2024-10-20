import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect } from 'react';
import {colors} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      name && email && phone && password && password === confirmPassword;
    setIsFormValid(isValid);
  }, [name, email, phone, password, confirmPassword]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = () => {
    if (isFormValid) {
      const userData = {
        name,
        email,
        phone,
        password,
      };
      navigation.navigate('SignUp2', {userData});
    }
  };

  return (
    <LinearGradient
      colors={['#007882', '#FAFA6E']}
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

        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Sign Up</Text>
        </View>

        <View style={styles.ImageContainer}>
          <Image
            source={require('../assets/original.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={25} color="black" />
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={25} color="black" />
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={25} color="black" />
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your contact number"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={25} color="black" />
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your password"
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntry(prev => !prev);
              }}>
              <Ionicons
                name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={25} color="black" />
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm your password"
              secureTextEntry={secureEntry}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntry(prev => !prev);
              }}>
              <Ionicons
                name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.signupButtonWrapper,
              {backgroundColor: isFormValid ? colors.darkgreen : 'gray'},
            ]}
            onPress={handlePress}
            disabled={!isFormValid}>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={25}
              color="white"
            />
            <Text style={styles.signUpText}>Next</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.signupText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 50,
  },
  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.white,
  },
  ImageContainer: {
    position: 'absolute',
    top: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  TextInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  signupButtonWrapper: {
    backgroundColor: colors.darkgreen,
    padding: 17,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    width: '100%',
  },
  signUpText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  accountText: {
    fontSize: 20,
  },
  signupText: {
    fontSize: 20,
    color: colors.darkgreen,
    marginLeft: 10,
  },
  topSquare1: {
    width: 300,
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.2,
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
    backgroundColor: '#fff',
    opacity: 0.2,
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
