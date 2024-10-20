import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { attachToken } from '../utils/api';

const AvailableRequests = () => {
  const [availableRequests, setAvailableRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    const fetchRequests = async ()=>{
      try {
        const id = await AsyncStorage.getItem('user');
        console.log('id', id);
        if(id){
          const profileUrl = `http://10.0.2.2:9093/providers/${id}`
          const profile = await attachToken(profileUrl);

          const { servicesOffered: wasteType, location } = profile;
          console.log('profile', profile);

          if(wasteType && location){
            console.log('wasteType', wasteType);
            console.log('location', location);
            const requestsUrl = `http://10.0.2.2:9092/providerService/filterRequests`;
            const body = {
              wasteType,
              location,
              radius: 10000,
            };

            const requests = await attachToken(requestsUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
            console.log('requests', requests);
            setAvailableRequests(requests);
        } else {
          console.error('Invalid user profile data');
        }
      } else {
        console.error('User not found');
      } 
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleHelp = () => {
   
  };

  const handleEditProfile = () => {
    
  };

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity
      style={styles.requestContainer}
      onPress={() => navigation.navigate('PickupOverview', { request: item })}
    >
      <View style={styles.requestDetails}>
        <Text style={styles.wasteTypeText}>Type: {item.wasteType}</Text>
        <Text style={styles.sizeText}>Size: {item.size}</Text>
        <Text style={styles.addressText}>Address: {item.address}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="black" />
    </TouchableOpacity>
  );

  if (loading) {
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
  }
  
  return (
    <LinearGradient
      colors={['#FAFA6E', '#23AA8F']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.8}}>
      <View style={styles.topSquare1}></View>
      <View style={styles.topSquare2}></View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Available Requests</Text>

        <FlatList
          data={availableRequests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />

        <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleNavigate('Help')} style={styles.iconButton}>
            <Ionicons name="help-circle-outline" size={30} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate('EditProfile')} style={styles.iconButton}>
            <Ionicons name="create-outline" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AvailableRequests;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 5
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.darkgreen,
    zIndex: 5
  },
  list: {
    marginVertical: 20,
    zIndex: 5,
    paddingHorizontal: 20
  },
  requestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  requestDetails: {
    flex: 1,
  },
  requestText: {
    fontSize: 18,
    color: colors.darkgreen,
  },
  wasteTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sizeText: {
    fontSize: 14,
    color: '#555',
  },
  addressText: {
    fontSize: 12,
    color: '#777',
  },
  list: {
    marginHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.darkgreen
  },
  footerIconWrapper: {
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
