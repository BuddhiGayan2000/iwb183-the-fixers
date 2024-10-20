import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const wasteCategories = [
  {
    label: 'ELECTRONICS',
    examples:
      'e.g., Old computers, mobile phones, televisions, printers, batteries, cables, and household appliances like refrigerators or microwaves.',
    description:
      'includes any waste generated from electronic devices or gadgets that are no longer functional or obsolete. Could contain metals (like copper and gold), plastics, and hazardous components (like mercury and lead). Often recyclable but requires special handling due to potentially toxic materials.',
  },
  {
    label: 'FURNITURE',
    examples:
      'e.g., Sofas, chairs, tables, beds, cabinets, mattresses, and carpets',
    description:
      'Discarded or broken items of furniture that are no longer useful. Made from various materials like wood, metal, foam, and fabric. Some furniture is recyclable (especially wooden or metal pieces), while others (like upholstered furniture) may be difficult to recycle.',
  },
  {
    label: 'PLASTIC',
    examples:
      'e.g., Bottles, packaging, food containers, straws, plastic bags, and disposable cups.',
    description:
      'Any material made from plastic that has been discarded after use. Non-biodegradable and can take hundreds of years to decompose. Can often be recycled (depending on the type of plastic), but some plastics are more difficult to recycle.',
  },
  {
    label: 'METAL',
    examples:
      'e.g., Aluminum cans, scrap metal, steel products, copper wires, and old tools.',
    description:
      'Waste consisting of any metallic material, including both ferrous (containing iron) and non-ferrous metals (without iron). Metals are highly recyclable and valuable. Recycling metal saves energy and reduces environmental impact. Includes both heavy metals like lead (which need careful disposal) and common metals like steel and aluminum.',
  },
  {
    label: 'ORGANIC',
    examples:
      'e.g., Food scraps, yard waste (leaves, grass clippings), kitchen waste, fruit and vegetable peels, and paper products.',
    description:
      'Any waste that comes from natural sources and is biodegradable. Decomposes naturally over time. Can be composted to create fertilizer, reducing landfill waste and benefiting the environment.',
  },
  {
    label: 'HAZARDOUS',
    examples:
      'e.g., Chemicals (paint, solvents, pesticides), medical waste (needles, medications), batteries, fluorescent light bulbs, and household cleaning agents.',
    description:
      'Waste that poses a threat to human health or the environment due to its chemical composition or toxicity. Requires special handling and disposal to prevent harm to people, animals, and the environment. Often regulated by environmental protection agencies and should never be thrown away with regular waste.',
  },
];

const SignUpScreen3 = ({route}) => {
  const {userData} = route.params;
  console.log("userdat 3",userData);

  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = category => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category],
    );
  };

  const handleProceed = async () => {
    const updatedUserData = {
      ...userData,  
      servicesOffered: selectedCategories, 
    };
    console.log('Updated User Data:', updatedUserData);

    try {
      const response = await fetch('http://10.0.2.2:9093/providers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
      console.log('Registration Success:', responseData);
      navigation.navigate('Login', { userData: updatedUserData });
    } catch (error) {
      if (error.response) {
          console.log('Error Response:', error.response.data);
      } else if (error.request) {
          console.log('Error Request:', error.request);
      } else {
          console.log('Error Message:', error.message);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#23AA8F', '#FAFA6E']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.8}}>
      <View style={styles.topSquare1}></View>
      <View style={styles.topSquare2}></View>
      <View style={styles.container}>
        <Text style={styles.title}>Select Waste Categories</Text>
        <ScrollView style={styles.scrollView}>
          {wasteCategories.map(category => (
            <TouchableOpacity
              key={category.label}
              style={[
                styles.categoryContainer,
                selectedCategories.includes(category.label)
                  ? styles.selected
                  : styles.unselected,
              ]}
              onPress={() => toggleCategory(category.label)}>
              <View style={styles.categoryContent}>
                <View style={styles.categoryTextWrapper}>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategories.includes(category.label)
                        ? styles.selectedTitle
                        : styles.unselectedTitle,
                    ]}>
                    {category.label}
                  </Text>
                  <Text
                    style={[
                      styles.exampleText,
                      selectedCategories.includes(category.label)
                        ? styles.selectedText
                        : styles.unselectedText,
                    ]}>
                    {category.examples}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
            disabled={selectedCategories.length === 0}>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={25}
              color="white"
            />
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen3;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
    zIndex: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    maxHeight: '85%',
  },
  categoryContainer: {
    backgroundColor: colors.lightgreen,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  categoryTextWrapper: {
    flex: 1,
  },
  selected: {
    backgroundColor: colors.darkgreen,
  },
  unselected: {
    backgroundColor: 'white',
    color: colors.darkgreen,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: 'gray',
  },
  exampleText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'gray',
  },
  selectedTitle: {
    color: 'white',
  },
  unselectedTitle: {
    color: colors.darkgreen,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: colors.darkgreen,
    padding: 17,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    elevation: 5,
    gap: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    width: '100%',
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topSquare1: {
    width: 300,
    height: 170,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
