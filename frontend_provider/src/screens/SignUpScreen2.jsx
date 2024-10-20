import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/colors';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GOOGLE_API_KEY } from '@env';

const SignUpScreen2 = ({route}) => {

  const { userData } = route.params;
  console.log("userdata: ",userData);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setMarkerCoordinate({latitude, longitude});
        setCoordinates(`${latitude},${longitude}`);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const handlePlaceSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const {lat, lng} = details.geometry.location;

      setRegion({
        ...region,
        latitude: lat,
        longitude: lng,
      });
      setMarkerCoordinate({latitude: lat, longitude: lng});

      const coordString = `${lat},${lng}`;
      console.log('Selected Coordinates:', coordString);
      setCoordinates(coordString);
      setAddress(details.formatted_address);
    } else {
      console.error('Location details are not available', details);
    }
  };

  const handleNextStep = () => {

    const locationArray = coordinates.split(',').map(Number);
    const updatedUserData = {
      ...userData,
      address: address,
      location: locationArray, 
    };
    navigation.navigate('SignUp3', {userData: updatedUserData});
  };

  const isNextStepEnabled = coordinates.length > 0 && address.length > 0;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        loadingEnabled={true}>
        {markerCoordinate && (
          <Marker coordinate={markerCoordinate} title="Selected Location" />
        )}
      </MapView>

      <View style={styles.overlay}>
        <GooglePlacesAutocomplete
          placeholder="Search for your location"
          onPress={handlePlaceSelect}
          fetchDetails={true}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
          }}
        />

        <TextInput
          style={styles.addressInput}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity
          style={styles.selectButton}
          onPress={handleNextStep}
          disabled={!isNextStepEnabled}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={25}
            color="white"
          />
          <Text style={styles.selectButtonText}>Select Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '80%',
    fontSize: 15,
  },
  addressInput: {
    position: 'absolute',
    bottom: 80,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 15,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    fontSize: 15,
  },
  listView: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
    fontSize: 15,
  },
  selectButton: {
    position: 'absolute',
    bottom: 0,
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
  selectButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUpScreen2;
