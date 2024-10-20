import React, {useEffect, useState} from 'react';
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
import {attachToken} from '../utils/api';

const PickupHistoryScreen = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const completedUrl = `http://10.0.2.2:9091/pickupRequest/completedRequests`;

        const completed = await attachToken(completedUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setCompletedRequests(completed);
      } catch (error) {
        console.error('Error fetching completed requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const renderRequestItem = item => (
    <TouchableOpacity
      style={styles.requestContainer}
      onPress={() => navigation.navigate('PickupOverview', {request: item})}>
      <View style={styles.requestDetails}>
        <Text style={styles.wasteTypeText}>Type: {item.wasteType}</Text>
        <Text style={styles.sizeText}>Size: {item.size}</Text>
        <Text style={styles.addressText}>Address: {item.address}</Text>
        <Text style={styles.dateText}>Date: {item.date}</Text>
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Pickup History</Text>

        <FlatList
          data={completedRequests}
          renderItem={({item}) => renderRequestItem(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          style={styles.list}
        />
      </View>
    </LinearGradient>
  );
};

export default PickupHistoryScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  },
  list: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  requestContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  requestDetails: {
    flex: 1,
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
  dateText: {
    fontSize: 12,
    color: '#777',
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Loadinglogo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
    borderRadius: 100
  },
});
