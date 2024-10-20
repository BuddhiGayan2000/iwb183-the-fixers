import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import { attachToken } from '../utils/api';
import {useNavigation} from '@react-navigation/native';
import { GOOGLE_API_KEY } from '@env';

const CreatePickupRequest = () => {
  const [wasteType, setWasteType] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('SMALL');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isWasteTypeModalVisible, setWasteTypeModalVisible] = useState(false);
  const [isSizeModalVisible, setSizeModalVisible] = useState(false);

  const wasteTypes = [
    'ELECTRONICS',
    'FURNITURE',
    'PLASTIC',
    'METAL',
    'ORGANIC',
    'HAZARDOUS',
  ];
  const sizes = ['SMALL', 'MEDIUM', 'LARGE'];

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setCoordinates({latitude, longitude});
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const handlePlaceSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const {lat, lng} = details.geometry.location;
      setRegion({...region, latitude: lat, longitude: lng});
      setCoordinates({latitude: lat, longitude: lng});
      setAddress(details.formatted_address);
    }
  };

  const handleSubmit = async () => {
    const pickupRequest = {
      wasteType,
      description,
      size,
      location: [coordinates.longitude, coordinates.latitude],
      address,
      createdDate: new Date().toISOString(),
    };
    console.log('New Pickup Request:', pickupRequest);

    try {
        const response = await attachToken('http://10.0.2.2:9091/pickupRequest/newRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pickupRequest),
        });
        if(response){
            console.log('Pickup Request Created:', response);
            navigation.navigate('MainDash');
        }
    } catch (error) {
      console.error('Error creating pickup request:', error);
        
    }

  };

  const renderOption = (item, setSelected, setVisible) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelected(item);
        setVisible(false);
      }}>
      <Text style={styles.modalText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FAFA6E', '#23AA8F']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.8}}>
      <FlatList
        style={styles.page}
        data={[]}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Create a Pickup Request</Text>

            <View style={styles.bigBox}>
              <Text style={styles.label}>Waste Type</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setWasteTypeModalVisible(true)}>
                <Text style={styles.dropdownText}>
                  {wasteType || 'Select Waste Type'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Add description"
                value={description}
                onChangeText={setDescription}
              />

              <Text style={styles.label}>Size</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setSizeModalVisible(true)}>
                <Text style={styles.dropdownText}>{size || 'Select Size'}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Select Location</Text>
              <GooglePlacesAutocomplete
                placeholder="Search for a place"
                fetchDetails={true}
                onPress={handlePlaceSelect}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'en',
                }}
                styles={googleAutoCompleteStyles}
              />

              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Edit address"
                value={address}
                onChangeText={setAddress}
              />

              <MapView style={styles.map} region={region}>
                {coordinates && <Marker coordinate={coordinates} />}
              </MapView>

              <Modal
                visible={isWasteTypeModalVisible}
                transparent={true}
                animationType="slide">
                <View style={styles.modalContainer}>
                  <FlatList
                    data={wasteTypes}
                    keyExtractor={item => item}
                    renderItem={({item}) =>
                      renderOption(item, setWasteType, setWasteTypeModalVisible)
                    }
                    nestedScrollEnabled={true}
                  />
                </View>
              </Modal>

              <Modal
                visible={isSizeModalVisible}
                transparent={true}
                animationType="slide">
                <View style={styles.modalContainer}>
                  <FlatList
                    data={sizes}
                    keyExtractor={item => item}
                    renderItem={({item}) =>
                      renderOption(item, setSize, setSizeModalVisible)
                    }
                    nestedScrollEnabled={true}
                  />
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color="white"
                />
                <Text style={styles.submitText}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        keyExtractor={() => 'dummy'}
      />
    </LinearGradient>
  );
};
export default CreatePickupRequest;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  page: {
    marginHorizontal: 10,
    marginTop: 20,
    zIndex: 5,
  },
  bigBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkgreen,
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: colors.darkgreen,
    marginBottom: 5,
    fontWeight: '600',
  },
  dropdown: {
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#5d5d5d',
  },
  input: {
    fontSize: 16,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: colors.darkgreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    marginTop: 20,
  },
  submitText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

const googleAutoCompleteStyles = {
  container: {
    width: '100%',
    marginBottom: 10,
  },
  textInput: {
    height: 44,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: colors.lightgray,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
};
