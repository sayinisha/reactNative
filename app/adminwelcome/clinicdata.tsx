import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Animated, { FadeIn, FadeOut, useSharedValue} from 'react-native-reanimated';
import { collection, getDocs, query, where } from "firebase/firestore";
import {valuedb} from '../../src/firebase'
import FirestoreResultUI from '../adminwelcome/FirestoreResultUI'
import Toast from 'react-native-toast-message';

const PetAppUI = () => {
  const [selectedCity, setSelectedCity]     = useState('');
  const [selectedArea, setSelectedArea]     = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showAreaPicker, setShowAreaPicker] = useState(false);
  const [ResultsUI, setResultsUI]           = useState([]);
  const [Values , setValues]                = useState(false)




  const fadeAnim = useSharedValue(1);
  const slideAnim = useSharedValue(0);
  const cities = ['Karur', 'Trichy', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',"Nagapattinam","Namakkal","kantyakumari"];
  const areas = {
    Karur: ['VH Athoor', 'VH KANIYALAMPATII'],
    Trichy: ['Srirangam', 'Woraiyur', 'Puthur', 'Thillai Nagar'],
    Krishnagiri: ['VPC HOSUR', 'VH BARGUR'],
    Madurai: ['VPC MADURAI', 'VH THIRUMANGALAM', 'VH MELUR', ],
    Mayiladuthurai: ['CC MAYILADUTHURAI', 'VH SIRKAZHI', ],
    Nagapattinam: ['VH NAGAPATTINAM', 'VH VEDHARANYAM', ],
    Namakkal: ['VH NAMAKKAL' ],
    kantyakumari : ['VD THINGALNAGAR','VD KOTTARAM']
  };

  const fetchFirestoreData = async () => {
    
  try {
    const q = query(
      collection(valuedb, "DogFullDataBase"),
      where("City", "==", selectedCity.toUpperCase()),
      where("Area", "==", selectedArea.toUpperCase())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      
          Toast.show({
            type: "error",
            text1: "There is No Record to display!",
            visibilityTime: 2000,
          });
      return null;
    }
    let results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setResultsUI(results)
    setValues(true)
    return results;

  } catch (error) {
    return null;
  }
};

  const handleSubmit = () => {
    if (!selectedCity || !selectedArea) {
      return;
    }
    fetchFirestoreData(selectedCity, selectedArea);
  };
  return (
    <View style={styles.container}>
      {!Values ? 
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PetCare</Text>
          <TouchableOpacity>
            <Ionicons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeBanner}>
          <View>
            <Text style={styles.welcomeText}>Hello, Admin!</Text>
            <Text style={styles.subWelcome}>Ready for Clinic Details?</Text>
          </View>
          <Ionicons name="paw" size={40} color="#fff" />
        </View>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={[styles.dropdownButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => setShowCityPicker(!showCityPicker)}
          >
            <Ionicons name="location" size={22} color="#fff" />
            <Text style={styles.dropdownButtonText}>
              {selectedCity || 'Select City'}
            </Text>
            <Ionicons 
              name={showCityPicker ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>

          {showCityPicker && (
            <Animated.View 
              style={[styles.pickerContainer,{opacity: fadeAnim,transform: [{ translateY: slideAnim }]}]}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <View style={styles.pickerHeader}>
                <Text style={styles.pickerTitle}>Select City</Text>
                <TouchableOpacity onPress={() => setShowCityPicker(false)}>
                  <Ionicons name="close" size={22} color="#666" />
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => {
                  setSelectedCity(itemValue);
                  setSelectedArea('');
                  setShowCityPicker(false);
                }}
                style={styles.picker}
                dropdownIconColor="#007bff"
              >
                <Picker.Item 
                  label="-- Select City --" 
                  value="" 
                  style={{ color: 'red' }} 
                />
                {cities.map((city) => (
                  <Picker.Item 
                    key={city} 
                    label={city} 
                    value={city} 
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
              <View style={styles.pickerFooter}>
                <Text style={styles.selectedText}>
                    {selectedCity ? `Selected: ${selectedCity}` : "Please select a city"}
                </Text>
              </View>
            </Animated.View>
          )}
          {selectedCity && (
            <View>
              <TouchableOpacity 
                style={[styles.dropdownButton, { 
                  backgroundColor: '#2196F3',
                  marginTop: 10
                }]}
                onPress={() => setShowAreaPicker(!showAreaPicker)}
                disabled={!selectedCity}
              >
                <Ionicons name="map" size={22} color="#fff" />
                <Text style={styles.dropdownButtonText}>
                  {selectedArea || 'Select Area'}
                </Text>
                <Ionicons 
                  name={showAreaPicker ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color="#fff" 
                />
              </TouchableOpacity>
              {showAreaPicker && (
                <Animated.View 
                  style={[
                  styles.pickerContainer,
                  {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                  }
                  ]}
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                >
                  <View style={styles.pickerHeader}>
                    <Text style={styles.pickerTitle}>Select Area</Text>
                    <TouchableOpacity onPress={() => setShowAreaPicker(false)}>
                        <Ionicons name="close" size={22} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <Picker
                    selectedValue={selectedArea}
                    onValueChange={(itemValue) => {
                        setSelectedArea(itemValue);
                        setShowAreaPicker(false);
                    }}
                    style={styles.picker}
                    dropdownIconColor="#007bff"
                  >
                    <Picker.Item 
                      label="-- Select Area --" 
                      value="" 
                      style={{ color: 'red' }} 
                    />
                    {areas[selectedCity]?.map((city) => (
                        <Picker.Item 
                        key={city} 
                        label={city} 
                        value={city} 
                        style={styles.pickerItem}
                        />
                    ))}
                  </Picker>
                  <View style={styles.pickerFooter}>
                    <Text style={styles.selectedText}>
                        {selectedArea ? `Selected: ${selectedArea}` : "Please select a city"}
                    </Text>
                  </View>
                </Animated.View>
              )}
            </View>
          )}
          {selectedArea && (
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Ionicons name="checkmark-circle" size={22} color="#fff" />
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View> 
        {/* </View> */}
          {/* <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="add-circle" size={28} color="#fff" />
              <Text style={styles.actionText}>New Pet</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#2196F3' }]}>
              <Ionicons name="search" size={28} color="#fff" />
              <Text style={styles.actionText}>Find Pet</Text>
            </TouchableOpacity>
          </View> */}

          {/* Today's Appointments */}
          {/* <Text style={styles.sectionTitle}>Today s Appointments</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.appointmentCard}>
              <Text style={styles.petName}>Max</Text>
              <Text style={styles.ownerName}>Rajesh Kumar</Text>
              <Text style={styles.time}>10:30 AM</Text>
              <Text style={styles.reason}>Vaccination</Text>
            </View> */}
            {/* More appointment cards... */}
          {/* </ScrollView> */}

          {/* Main Features */}
          {/* <View style={styles.features}>
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="medkit" size={32} color="#FF7043" />
              <Text style={styles.featureText}>Medical Records</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="calendar" size={32} color="#5C6BC0" />
              <Text style={styles.featureText}>Appointments</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="cash" size={32} color="#66BB6A" />
              <Text style={styles.featureText}>Billing</Text>
            </TouchableOpacity>
          </View> */}
      </View>
          :
        <FirestoreResultUI data={ResultsUI} setValues={setValues} dropDownArea={areas} dropDownCity={selectedCity} dropDownArea2={selectedArea}/>
      }
            <Toast  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeBanner: {
    backgroundColor: '#7E57C2',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subWelcome: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAction: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: 180,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  time: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  reason: {
    fontSize: 13,
    color: '#FF7043',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownButtonText: {
    flex: 1,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 12,
    fontSize: 16,
  },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginTop: 4,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   picker: {
//     width: '50%',
//     color: '#333',
//     display:'flex',
//     justifyContent:"center"
//   },


  picker: {
  width: '100%',  // Takes full available width
  height: 50,     // Optimal touch target size
  backgroundColor: '#fff',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  justifyContent: 'center',
  paddingHorizontal: 15,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  // For iOS picker items
  color: '#333',
  fontSize: 16,
  // For Android picker
  paddingVertical: Platform.OS === 'android' ? 0 : 10,
},
  pickerContainer: {
  backgroundColor: '#fff',
  borderRadius: 12,
  marginTop: 8,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#e0e0e0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
},
pickerHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
  backgroundColor: '#f9f9f9',
},
pickerTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
// picker: {
//   width: '100%',
//   backgroundColor: '#fff',
// },
pickerItem: {
  fontSize: 16,
  color: '#333',
},
pickerFooter: {
  padding: 12,
  borderTopWidth: 1,
  borderTopColor: '#f0f0f0',
  backgroundColor: '#f9f9f9',
},
selectedText: {
  fontSize: 14,
  color: '#666',
  fontStyle: 'italic',
}, submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    width:"40%"
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default PetAppUI;