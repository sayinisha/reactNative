import React, { useState ,useEffect} from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator,TouchableOpacity ,Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, query, where } from "firebase/firestore";
import {valuedb} from '../../src/firebase'
import Toast from 'react-native-toast-message';




export default function FirestoreResultUI({ data, setValues , dropDownArea, dropDownCity, dropDownArea2 , }) {
      const [selectedArea, setSelectedArea]     = useState('');
        const [showAreaPicker, setShowAreaPicker] = useState(data);
        const [Loading2, setLoading2] = useState(true)
    useEffect(() => {
        setTimeout(() => {
        setLoading2(false)
        setSelectedArea(dropDownArea2)
        setShowAreaPicker(data)
        }, 2000);
    }, [dropDownArea2]);


    
    const handleAreaChange = async(itemValue) => {
        setSelectedArea(itemValue);
        let results = [];
        try {
            let q
            if(itemValue === "Select All"){
                setLoading2(true)
                q = query(
                    collection(valuedb, "DogFullDataBase"),
                    where("City", "==", dropDownCity.toUpperCase()),
                    // where("Area", "==", itemValue.toUpperCase())
                );
            }else{
                setLoading2(true)
                q = query(
                    collection(valuedb, "DogFullDataBase"),
                    where("City", "==", dropDownCity.toUpperCase()),
                    where("Area", "==", itemValue.toUpperCase())
                );
            }
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                Toast.show({
                    type: "error",
                    text1: "There is No Record to display!",
                    visibilityTime: 2000,
                });
                setShowAreaPicker([])
            return null;
            }
            querySnapshot.forEach((doc) => {results.push({ id: doc.id, ...doc.data() });});
            setTimeout(() => {
                setLoading2(false)
            }, 1500);
            setShowAreaPicker(results)
            return results;
        }catch(error){
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setValues(false)}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>RFID Scan Results</Text>
                </View>
                <View style={[styles.header2 , {justifyContent:'space-between'}]}>
                    <Text style={[styles.countText]}>Total Records : { !Loading2 ? showAreaPicker?.length : "..."}</Text>
                    <Picker
                        selectedValue={selectedArea}
                        onValueChange={handleAreaChange}
                        style={styles.picker}
                        dropdownIconColor="#007bff"
                    >
                        {dropDownArea[dropDownCity]?.map((city) => (
                            <Picker.Item 
                                key={city} 
                                label={city} 
                                value={city} 
                                style={styles.pickerItem} 
                            />
                        ))}
                        <Picker.Item 
                            label="Select All" 
                            value="Select All" 
                            style={{ color: "red" }} 
                        />
                    </Picker>
                </View>
                {Loading2 ? 
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                        <ActivityIndicator size="large" color="#007bff" />
                        <Text style={{ marginTop: 10, fontSize: 16, color: "#007bff" }}>Fetching Data ...</Text>
                    </View> 
                :
                    <FlatList
                        data={showAreaPicker}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                {item?.Picture && (
                                    <Image
                                        source={{ uri: item?.Picture }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                                <View style={styles.info}>
                                    <Text style={styles.title}>
                                        {item.PetName} ({item.Age} yrs)
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        <Ionicons name="location" size={14} color="#666" />{" "}
                                        {item.Area}, {item.City}
                                    </Text>
                                    <Text style={styles.text}>Weight: {item.Weight} kg</Text>
                                    <Text style={styles.text}>Height: {item.Height} cm</Text>
                                    <Text style={styles.text}>RFID : {item.RfidCode}</Text>
                                    <Text style={styles.text}>Birth Control: {item.BirthControl}</Text>
                                    <Text style={styles.text}>Address: {item.Address}</Text>
                                </View>
                            </View>
                        )}
                    />
                }
            </>
            <Toast  />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:,
    // padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    // justifyContent:spcae-betwee
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  countText: { fontSize: 14, marginBottom: 8, fontWeight: "600", color: "#333" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#555", marginVertical: 2 },
  text: { fontSize: 13, color: "#444" },
    picker: {
    width: '50%',  // Takes full available width
    height: 50,     // Optimal touch target size
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth: 1,
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
pickerItem: {
  fontSize: 16,
  color: '#333',
},
});
