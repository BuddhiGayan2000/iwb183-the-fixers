import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/native';
import {attachToken} from '../utils/api';

const PickupOverviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {request} = route.params;

  const [customer, setCustomer] = useState({name: '', phone: ''});

  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [scheduledDateString, setScheduledDateString] = useState(
    scheduledDate.toLocaleDateString(),
  );

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await attachToken(
          `http://10.0.2.2:9092/providerService/customerDetails/${request.userId}`,
          {
            method: 'GET',
          },
        );
        if (response) {
          setCustomer({name: response.name, phone: response.phone});
        } else {
          Alert.alert('Error', 'Failed to fetch customer details.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Error',
          'An error occurred while fetching customer details.',
        );
      }
    };

    fetchCustomerDetails();
  }, [request.userId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAcceptRequest = async () => {
    const formattedDate = scheduledDate.toISOString().split('T')[0];
    console.log('formattedDate', formattedDate);
    try {
      const body = {
        scheduledDate: formattedDate,
      };
      const response = await attachToken(
        `http://10.0.2.2:9092/providerService/acceptRequest/${request.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      if (response) {
        Alert.alert('Success', response);
      } else {
        Alert.alert('Error', 'Failed to accept the request.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while accepting the request.');
    }
  };

  const handleCompleteRequest = async () => {
    try {
      const requestUrl = `http://10.0.2.2:9092/providerService/completeRequest/${request.id}`;
      const response = await attachToken(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        Alert.alert('Success', response);
      } else {
        Alert.alert('Error', 'Failed to complete the request.');
      }
    } catch (error) {
      console.error('Error completing request:', error);
    }
  };

  const renderStatusDetails = () => {
    switch (request.status) {
      case 'PENDING':
        return (
          <>
            <Text style={styles.pendingText}>Status: {request.status}</Text>
            <TextInput
              style={styles.inputField}
              value={scheduledDateString}
              onChangeText={text => {
                setScheduledDateString(text);
              }}
              placeholder="Enter scheduled date (e.g., MM/DD/YYYY)"
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAcceptRequest}>
              <Text style={styles.buttonText}>Accept Request</Text>
            </TouchableOpacity>
          </>
        );
      case 'SCHEDULED':
        return (
          <>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Scheduled Date: </Text>
              {request.scheduledDate}
            </Text>
            <Text style={styles.scheduledText}>Status: {request.status}</Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleCompleteRequest}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </>
        );
      case 'COMPLETED':
        const date = new Date(request.completedDate)
          .toISOString()
          .split('T')[0];
        return (
          <>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Completed Date: </Text>
              {date}
            </Text>
            <Text style={styles.completedText}>Status: {request.status}</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#FAFA6E', '#23AA8F']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.8}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={handleGoBack}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Request Details</Text>
          <Text
            style={[styles.wasteTypeText, {backgroundColor: colors.darkgreen}]}>
            {request.wasteType}
          </Text>

          <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Description: </Text>
                {request.description}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Address: </Text>
                {request.address}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Size: </Text>
                {request.size}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Customer Name: </Text>
                {customer.name}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Contact Number: </Text>
                {customer.phone}
              </Text>
          </View>

          <View style={styles.statusContainer}>{renderStatusDetails()}</View>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: request.location[1],
              longitude: request.location[0],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker
              coordinate={{
                latitude: request.location[1],
                longitude: request.location[0],
              }}
              title="Pickup Location"
              description={request.description}
            />
          </MapView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PickupOverviewScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
    color: colors.darkgreen,
  },
  label: {
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.darkgreen,
  },
  wasteTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    padding: 5,
    color: colors.white,
    borderRadius: 5,
    borderRadius: 50,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: '18%',
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.darkgreen,
  },
  label: {
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    borderRadius: 10,
    marginBottom: 20
  },
  statusContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: colors.darkgreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  pendingText: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduledText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
