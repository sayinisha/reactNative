// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar ,ActivityIndicator,TextInput,Image,Platform,Modal,KeyboardAvoidingView  } from "react-native";
// import { Ionicons ,MaterialIcons} from '@expo/vector-icons';
// import { router , useLocalSearchParams } from 'expo-router';
// import DropDownPicker from 'react-native-dropdown-picker';
// import * as ImagePicker from 'expo-image-picker';
// import { Camera } from 'expo-camera';
// import Toast, { BaseToast } from 'react-native-toast-message';
// import * as Location from "expo-location";
// import { addDoc, collection , getDocs, query, where,  doc, updateDoc , getDoc , setDoc} from 'firebase/firestore';
// import { valuedb } from '../../../src/firebase'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// export default function IndexPage() {
//   const [step, setStep]                       = useState(0)
//   const [openArea, setOpenArea]               = useState(false);
//   const [openCategory, setOpenCategory]       = useState(false);
//   const [Loading, setLoading]                 = useState(false);
//   const [LoadingData, setLoadingData]         = useState(false);
//   const [rfidCode, setRfidCode]               = React.useState('');
//   const [scanning, setScanning]               = React.useState(false);
//   const [Register, SetRegister]               = useState('Submit');
//   const [modalVisible, setModalVisible]       = useState(false);
//   const [showModal, setShowModal]             = useState(false);
//   const [email, setEmail]                     = useState(useLocalSearchParams());
//   const [reason, setReason]                   = useState("");
//   const [UserData, setUserData]               = useState([]);
//   const [petData, setPetData]                 = useState({
//     Picture : "",
//     PetName :"",
//     Area: null,
//     PetCategory: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: 'Yes',
//     Gender: 'Female'
//   });
//   const [rfidCodegetData, setrfidCodegetData] = useState("");
//   const [areaItems, setAreaItems]             = useState([]);
//   const [categoryItems, setCategoryItems] = useState([
//     { label: 'House Dog', value: 'House Dog' },
//     { label: 'Street Dog', value: 'Street Dog' },
//   ]);
//   const [formData , setFormData] = useState({
//     Picture : "",
//     PetName :"",
//     Area: null,
//     PetCategory: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: 'Yes',
//     Gender: 'Female'
//   })
//   const [Error , Formerror] = useState({
//     Picture : "",
//     PetName :"",
//     Area: '',
//     PetCategory: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: '',
//     Gender: '',
//     reason:""
//   })
//   const [ErrorMsg, setErrorMsg] = useState("")

//   useEffect(() => {
//     if (!email) return;
//     const fetchData = async () => {
//       try {
//         const q = query(
//           collection(valuedb, "cityandcentres"),
//           where("Email", "==", email)
//         );
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const documents = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
//           console.log(documents)
//           setUserData(documents);
//         } else {
//           console.log("No documents found with this email");
//         }
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [email]);


//   const inputRef = React.useRef(null);


//   const getAddressFromCoords = async (lat, lon) => {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     const city = data.address.city || data.address.town || data.address.village || "";
//     return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

//   };

//   // Scan start handler
//   const handleStartScan = async() => {
//     // let { status } = await Location.requestForegroundPermissionsAsync();
//     // if (status !== "granted") {
//     //     setErrorMsg("Permission to access location was denied");
//     //   return;
//     // }
//     // let loc = await Location.getCurrentPositionAsync({
//     //   accuracy: Location.Accuracy.Highest
//     // });

//     // let address = await getAddressFromCoords(
//     //   loc.coords.latitude,
//     //   loc.coords.longitude
//     // );
    
//     setScanning(false);
//     inputRef.current?.focus();
//     setLoading(false)
//     setStep(3);
//     console.log(step)
//     try {
//       const result = UserData.map(item => ({
//         label: item["area"],
//         value: item["area"]
//       }));
//       setAreaItems(result)
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleStartScaning = () => {
//     setScanning(true);
//     setTimeout(() => {
//     setStep(6);
//       inputRef.current?.focus();
//     }, 1000);
//   };

//   // Input change handler - reader usually sends code automatically as input
//   const handleInputChange = async(event) => {
//     setRfidCode("0003826505");
//     if (event.length >= 8) {
//       setScanning(false);
//       setLoading(true);
//       try {
//         const q = query(collection(valuedb, "DogFullDataBase"), where("RfidCode", "==", "0003826505"));
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           setRfidCode("");
//           Toast.show({
//             type: 'error',
//             text1: '⚠ RFID Already Exists!',
//             text2: 'Give New RFID Number.',
//             visibilityTime: 1200,
//           });
//           setLoading(false);
//           return;
//         }
//         setTimeout(() => {
//           setStep(2);
//           setLoading(false);
//         }, 1000);

//       }catch(error){
//         Toast.show({
//           type: 'error',
//           text1: '⚠ Error checking RFID!',
//           text2: 'Checking RFID Number !!!!!!!.',
//           visibilityTime: 1200,
//         });
//       }
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Camera permission is required to take photos');
//       return;
//     }
//     if (Platform.OS === 'web') {
//     var result 
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (readerEvent) => {
//           setFormData(prev => ({
//             ...prev,
//             Picture: readerEvent.target.result
//           }));
//           Formerror(prev => ({
//             ...prev,
//             Picture: ""
//           }));
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     input.click();
//   } else {
//     result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if(!result.canceled){
//       setFormData({
//         ...formData,
//         Picture: result.assets[0].uri // Update only the Picture field
//       });
//     }
//   }
//   };

    
//   const toastConfig = {
//     success: (props) => (
//     <BaseToast
//       {...props}
//       style={{
//         borderLeftColor: '#28a745',
//         backgroundColor: '#eaffea',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//         elevation: 4,
//       }}
//       text1Style={{
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#28a745'
//       }}
//       text2Style={{
//         fontSize: 14,
//         color: '#155724'
//       }}
//       renderLeadingIcon={() => (
//         <Ionicons name="checkmark-circle" size={28} color="#28a745" style={{ marginLeft: 10 }} />
//       )}
//     />
//   ),

//     error: (props) => (
//       <BaseToast
//         {...props}
//         style={{
//           borderLeftColor: '#FF3B30',
//           backgroundColor: '#ffeaea',
//           borderRadius: 10,
//           shadowColor: '#000',
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 2 },
//           shadowRadius: 4,
//           elevation: 4,
//         }}
//         text1Style={{
//           fontSize: 16,
//           fontWeight: 'bold',
//           color: '#FF3B30'
//         }}
//         text2Style={{
//           fontSize: 14,
//           color: '#721c24'
//         }}
//         renderLeadingIcon={() => (
//           <Ionicons name="close-circle" size={28} color="#FF3B30" style={{ marginLeft: 10 }} />
//         )}
//       />
//     ),

//     warning: (props) => (
//       <BaseToast
//         {...props}
//         style={{
//           borderLeftColor: '#ffc107',
//           backgroundColor: '#fff8e1',
//           borderRadius: 10,
//           shadowColor: '#000',
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 2 },
//           shadowRadius: 4,
//           elevation: 4,
//         }}
//         text1Style={{
//           fontSize: 16,
//           fontWeight: 'bold',
//           color: '#856404'
//         }}
//         text2Style={{
//           fontSize: 14,
//           color: '#856404'
//         }}
//         renderLeadingIcon={() => (
//           <Ionicons name="warning" size={28} color="#ffc107" style={{ marginLeft: 10 }} />
//         )}
//       />
//     ),
//   };


//   const validateFields = () => {
//     let tempErrors = {};
//     let isValid = true;
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) {
//       Toast.show({
//         type: 'error',
//         text1: '⚠ Required Fields Missing!',
//         text2: 'Please fill all mandatory fields before submitting.',
//         visibilityTime: 1200,
//       });
//         tempErrors[key] = `${key} is required`;
//         isValid = false;
//       }
//     });
//     Formerror(prev => ({ ...prev, ...tempErrors }));
//     return isValid;
//   };
  
//   // Form submission
//   const handleSubmit = async() => {
//     if (!validateFields()) return;
//     try {
//       if(Register === "Submit"){
//         setLoadingData(true)
//         if(formData.BirthControl === "Yes"){
//           const employeeRefs = collection(valuedb,"DogFullDataBase")
//           await addDoc(employeeRefs,{
//             ...formData,RfidCode : '0003832937',City:UserData[0]["city"],Address:UserData[0]["Address"],
//             createdAt: new Date().toISOString()
//           })
//           setTimeout(() => {
//             Toast.show({
//               type: 'success',
//               text1: `✅ Pet Data Saved successfully!`,
//               text2: 'Pet Data Stored In Database',
//               visibilityTime: 1200,
//             });
//             setRfidCode("");
//               setLoadingData(false)
//             setStep(0);
//             setFormData({
//               PetName :"",
//               Area: null,
//               PetCategory: '',
//               Height: '',
//               Weight: '',
//               Age: '',
//               Color: '',
//               BirthControl: 'Yes',
//               Gender: 'Male',
//               Picture :"",
//             })
//           }, 2000);
//         }else{
//           setShowModal(true);
//           setLoading(false)
//         }
//       }else{
//         setLoadingData(true)
//         if(formData.BirthControl === "Yes"){
//           try {
//             const employeeref = collection(valuedb, "DogFullDataBase");
//             const q = query(employeeref, where("RfidCode", "==", petData.RfidCode));
//             const snapshot = await getDocs(q);
//             if (!snapshot.empty) {
//               const docId = snapshot.docs[0].id;
//               const petDocRef = doc(valuedb, "DogFullDataBase", docId);
//               await updateDoc(petDocRef, {
//                 ...formData,City:UserData[0]["city"],Address:UserData[0]["Address"],
//                 updatedAt: new Date().toISOString()
//               });
//               setTimeout(() => {
//               }, 2000);
//               setrfidCodegetData("")
//             } else {
//               Toast.show({
//                 type: 'warning',
//                 text1: `No record found for this RFID Code.`,
//                 visibilityTime: 1200,
//               });
//             }
//             setTimeout(() => {
//               setRfidCode("");
//               setLoadingData(false)
//               setStep(0);
//                 Toast.show({
//                   type: 'success',
//                   text1: '✅ Pet data updated successfully!',
//                   text2: 'Pet Data Stored In Database',
//                   visibilityTime: 1200,
//                 });
//               setFormData({
//                 PetName :"",
//                 Area: null,
//                 PetCategory: '',
//                 Height: '',
//                 Weight: '',
//                 Age: '',
//                 Color: '',
//                 BirthControl: 'Yes',
//                 Gender: 'Male',
//                 Picture:""
//               })  
//             SetRegister("Submit");
//             }, 2000);
//           } catch (error) {
//             console.error("❌ Error updating pet data:", error);
//           }
//         }else{
//           setLoading(false)
//           setShowModal(true);
//         }
//       }
//     }catch (error){
//       console.error("Error adding data: ", error); 
//     }
//   };

//   const handleChange = (e) => {
//     // setScanning(true);
//     // setTimeout(() => {
//     //   inputRef.current?.focus();
//     // }, 200);
//   };

  
//   const handleConfirm = async () => {
//     if (!reason.trim()) {
//       console.log(reason)
//       let tempErrors = {};
//       tempErrors["reason"] = `Reason is required`;
//       Formerror(tempErrors);
//     }
//       setLoading(true)

//     // Save to Firestore with reason
//     const employeeRefs = collection(valuedb, "DogFullDataBase");
//     await addDoc(employeeRefs, {
//       ...formData,
//       RfidCode: "0003832937",City:UserData[0]["city"],Address:UserData[0]["Address"],
//       BirthControlReason: reason, // save reason here
//       createdAt: new Date().toISOString(),
//     });
//     setShowModal(false);
//     setReason("")
//     setTimeout(() => {
//       setRfidCode("");
//       setLoading(false)
//       setStep(0);
//               setFormData({
//                 PetName :"",
//                 Area: null,
//                 PetCategory: '',
//                 Height: '',
//                 Weight: '',
//                 Age: '',
//                 Color: '',
//                 BirthControl: 'Yes',
//                 Gender: 'Male',
//                 Picture:""
//               })
//       Toast.show({
//         type: "success",
//         text1: "✅ Pet Data Saved successfully!",
//         text2: 'Pet Data Stored In Database',
//         visibilityTime: 1200,
//       });
//         setStep(0);
//     }, 2000);
//   };

//   useEffect(() => {
//     if (step === 6) {
//       setLoading(true);
//       const employeeref = collection(valuedb, "DogFullDataBase");
//       const q = query(employeeref, where("RfidCode", "==", "0003832937"));
//       getDocs(q)
//         .then((snapshot) => {
//           let result = [];
//           snapshot.docs.forEach((doc) => {
//             result.push({ ...doc.data(), id: doc.id });
//           });
//           setTimeout(() => {
//             if (result.length > 0) {
//               setPetData(result[0]);
//               setModalVisible(true);
//             } else {
//               setLoading(false)
//               setrfidCodegetData("");
//               Toast.show({
//                 type: 'error',
//                 text1: '⚠ There Is No Record To Display!',
//                 visibilityTime: 1200,
//               });
//             }
//             setLoading(false);
//           }, 2000);
//         })
//         .catch((error) => {
//           setLoading(false);
//         });
//       }
//     },[step]);

//     const handleUpdate = () =>{
//       console.log(petData)

//       setFormData(prevFormData => {
//         const updated = { ...prevFormData };
//         Object.keys(updated).forEach(key => {
//           if (petData[key] !== undefined) {
//             updated[key] = petData[key];
//           }
//         });
//         return updated;
//       });
//       Formerror({ ...Error, PetName: '',Picture:"",Age:"",Area:"",PetCategory:"",Height:"",Weight:"",Color:"" })
//        if (petData?.Area) {
//         setAreaItems([{ label: petData.Area, value: petData.Area }]);
//       }
//       setStep(3);
//       SetRegister("Update");
//       setModalVisible(false);
//       setScanning(false);
//     }




//   return (
//   <View>
//     {Loading ? (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={{ marginTop: 10, fontSize: 16, color: "#007bff" }}>Loading ...</Text>
//       </View>
//     ) : (
//     <View>
//       <StatusBar barStyle="light-content" backgroundColor="#007bff" />
//       <View style={styles.headerContainer}>
//         { step === 0 || Register === "Update"? "" :
//           <TouchableOpacity
//             style={[styles.settingsButton, { marginRight: 315 }]}
//             onPress={() => setStep(0)} // This will go to the previous screen
//             activeOpacity={0.7}
//           >
//             <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => [setRfidCode(""),setStep(0),setScanning(false)]}/>
//           </TouchableOpacity>}
//           <Text style={styles.headerTitle}>Client Registration</Text>
//           <TouchableOpacity 
//             style={styles.settingsButton}
//             onPress={() => router.push('/')}
//             activeOpacity={0.7}
//           >
//             <Ionicons name="settings-outline" size={24} color="#fff" />
//           </TouchableOpacity>
//       </View>
//       { step === 0 ? 
//         <View style={styles.container}>
//           <ScrollView contentContainerStyle={styles.contentContainer}>
//             {UserData && UserData.length > 0 && (
//               <View style={styles.hospitalInfoContainer}>
//                 <View style={styles.hospitalCard}>
//                   {/* Header with icon and title */}
//                   <View style={styles.hospitalHeader}>
//                     <View style={styles.iconContainer}>
//                       <Ionicons name="medkit" size={28} color="#fff" />
//                     </View>
//                     <Text style={styles.hospitalTitle}>Hospital Information</Text>
//                   </View>
                  
//                   {/* Address Section */}
//                   <View style={styles.detailSection}>
//                     <View style={styles.iconTextRow}>
//                       <Ionicons name="location" size={22} color="#007bff" />
//                       <Text style={styles.sectionLabel}>Address</Text>
//                     </View>
//                     <Text style={styles.sectionValue}>{UserData[0]["Address"]}</Text>
//                   </View>
                  
//                   {/* Doctor Section */}
//                   <View style={styles.detailSection}>
//                     <View style={styles.iconTextRow}>
//                       <Ionicons name="person" size={22} color="#007bff" />
//                       <Text style={styles.sectionLabel}>Veterinary Doctor</Text>
//                     </View>
//                     <Text style={styles.sectionValue}>Dr. {UserData[0]["Name"]}</Text>
//                   </View>
//                 </View>
//               </View>
//             )}



//             <View style={styles.actionsContainer}>
//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.registerButton]}
//                 onPress={() => [setStep(1),Formerror({ ...Error, PetName: '',Picture:"",Age:"",Area:"",PetCategory:"",Height:"",Weight:"",Color:"" })]}
//               >
//                 <Ionicons name="paw" size={28} color="#fff" style={styles.buttonIcon} />
//                 <Text style={styles.actionButtonText}>Register Pet</Text>
//                 <Text style={styles.actionButtonSubtext}>Add new pet to system</Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.actionButton, styles.scanButton]}
//                 onPress={() => setStep(2)}
//               >
//                 <Ionicons name="scan" size={28} color="#fff" style={styles.buttonIcon} />
//                 <Text style={styles.actionButtonText}>Scan Pet</Text>
//                 <Text style={styles.actionButtonSubtext}>Find existing pet record</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       :""}        
//       {step === 3 ?    
//       <View>
//       {LoadingData ? (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={{ marginTop: 10, fontSize: 16, color: "#007bff" }}>Data Submitting ...</Text>
//       </View>
//     ) : (
//     <View style={{ flex: 1 }}> <KeyboardAvoidingView
//     style={{ flex: 1 }}
//     behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS → padding, Android → height
//     keyboardVerticalOffset={80} // Header height irundha adjust pannunga
//   >
//         <KeyboardAwareScrollView
//   style={{ flex: 1, backgroundColor: "#f5f7fa" }}
//   contentContainerStyle={{ padding: 20 }}
//   enableOnAndroid={true}
//   extraScrollHeight={100} // keyboard open aana appo extra scroll
//   keyboardShouldPersistTaps="handled"
// >
//           <View style={styles.Imagecontainer}>
//             <Text style={styles.header}>Register Pet</Text>
//             <TouchableOpacity 
//               style={[styles.imagePicker , Error.Picture && { borderColor: 'red', borderWidth: 1 }]}
//               onPress={takePhoto}
//                activeOpacity={0.8}
//             >
//               {formData.Picture ? (
//                 <Image 
//                   source={{ uri: formData.Picture }} 
//                   style={styles.petImage} 
//                 />
//               ) : (
//                 <>
//                   <Ionicons name="camera" size={40} color="#888" />
//                   <Text style={styles.uploadText}>Take Pet Picture</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//           {/* Pet Name */}
//           <Text style={styles.label}>Pet Name</Text>
//             <View >
//               <TextInput 
//                 style={[styles.input, { color: '#000' },Error.PetName && { borderColor: 'red', borderWidth: 1 }]} 
//                 placeholder="Enter pet name" 
//                 keyboardType="default"
//                 placeholderTextColor="#888"
//                 autoCapitalize="none"
//                 value={formData.PetName}
//                 onChangeText={(e)=>{setFormData({...formData, PetName:e});Formerror({ ...Error, PetName: '' });}}
//               />
//             </View>
//           <View style={{ height: 85, zIndex: 2 ,}}>
//             <Text style={styles.label}>Area</Text>
//             <DropDownPicker
//               open={openArea}
//               value={formData.Area}
//               items={areaItems}
//               setOpen={setOpenArea}
//               setValue={(callback) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   Area: callback(prev.Area)
//                 }));
//                 Formerror({ ...Error, Area: '' });
//               }}
//               setItems={setAreaItems}
//               placeholder="Select Area"
//               style={[{ borderColor: '#ccc',minHeight: 40} ,Error.Area && { borderColor: 'red', borderWidth: 1 }]}
//               dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
//               listItemContainerStyle={{height: 40 }}
//             />
//           </View>
//           <View style={{ height: 85, zIndex: 1 }}>
//             <Text style={styles.label}>Category</Text>
//             <DropDownPicker
//               open={openCategory}
//               value={formData.PetCategory}
//               items={categoryItems}
//               setOpen={setOpenCategory}
//               setValue={(callback) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   PetCategory: callback(prev.PetCategory)
//                 }));
//                 Formerror({ ...Error, PetCategory: '' });
//               }}
//               setItems={setCategoryItems}
//               placeholder="Select Category"
//               style={[{ borderColor: '#ccc',minHeight: 40},Error.PetCategory && { borderColor: 'red', borderWidth: 1 }]}
//               dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
//               listItemContainerStyle={{height: 40 }}
//             />
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={{ flex: 1, marginRight: 10 }}>
//               <Text style={styles.label}>Height (cm)</Text>
//               <View>
//                 <TextInput 
//                   style={[styles.input, { color: '#000' },Error.Height && { borderColor: 'red', borderWidth: 1 }]} 
//                   placeholder="Enter Height (cm)" 
//                   keyboardType="numeric"
//                   placeholderTextColor="#888"
//                   autoCapitalize="none"
//                   value={formData.Height}
//                   onChangeText={(e)=>{setFormData({...formData, Height:e});Formerror({ ...Error, Height: '' });}}
//                 />
//               </View>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.label}>Weight (kg)</Text>
//               <View>
//                 <TextInput 
//                   style={[styles.input, { color: '#000' },Error.Weight && { borderColor: 'red', borderWidth: 1 }]} 
//                   placeholder="Enter Weight (kg)" 
//                   keyboardType="numeric"
//                   placeholderTextColor="#888"
//                   autoCapitalize="none"
//                   value={formData.Weight}
//                   onChangeText={(e)=>{setFormData({...formData, Weight:e});Formerror({ ...Error, Weight: '' });}}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//             <View style={{ flex: 1, marginRight: 10 }}>
//               <Text style={styles.label}>Age (years)</Text>
//               <View>
//                 <TextInput 
//                   style={[styles.input, { color: '#000' },Error.Age && { borderColor: 'red', borderWidth: 1 }]} 
//                   placeholder="Enter age" 
//                   keyboardType="numeric"
//                   placeholderTextColor="#888"
//                   autoCapitalize="none"
//                   value={formData.Age}
//                   onChangeText={(e)=>{setFormData({...formData, Age:e});Formerror({ ...Error, Age: '' });}}
//                 />
//               </View>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.label}>Color</Text>
//               <View>
//                 <TextInput 
//                   style={[styles.input, { color: '#000' },Error.Color && { borderColor: 'red', borderWidth: 1 }]} 
//                   placeholder="Enter Color" 
//                   keyboardType="default"
//                   placeholderTextColor="#888"
//                   autoCapitalize="none"
//                   value={formData.Color}
//                   onChangeText={(e)=>{setFormData({...formData, Color:e});Formerror({ ...Error, Color: '' });}}
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
//             <View style={{ flex: 1, marginRight: 10 }}>
//               <Text style={styles.label}>Birth Control</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {["Yes", "No"].map((option) => (
//                   <TouchableOpacity
//                     key={option}
//                     style={[
//                       styles.radioBtn,
//                       formData.BirthControl === option && 
//                         option === "Yes" ? styles.greenBorder : styles.redBorder
//                     ]}
//                     onPress={() => {
//                       setFormData({ ...formData, BirthControl: option });
//                       Formerror({ ...Error, BirthControl: '' });
//                     }}
//                   >
//                     <Ionicons 
//                       name={formData.BirthControl === option ? "radio-button-on" : "radio-button-off"} 
//                       size={22} 
//                       color={option === "Yes" ? "#4CAF50" : "#F44336"}
//                     />
//                     <Text style={styles.radioText}>{option}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.label}>Gender</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {["Male", "Female"].map((option) => (
//                   <TouchableOpacity
//                     key={option}
//                     style={[
//                       styles.radioBtn,
//                       formData.Gender === option && 
//                         option === "Yes" ? styles.greenBorder : styles.redBorder
//                     ]}
//                     onPress={() => {
//                       setFormData({ ...formData, Gender: option });
//                       Formerror({ ...Error, Gender: '' });
//                     }}
//                   >
//                     <Ionicons 
//                       name={formData.Gender === option ? "radio-button-on" : "radio-button-off"} 
//                       size={22} 
//                       color={option === "Male" ? "#4CAF50" : "#F44336"}
//                     />
//                     <Text style={styles.radioText}>{option}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           </View>
//           <TouchableOpacity onPress={handleSubmit} style={{
//             backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center'
//           }}>
//             <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{Register}</Text>
//           </TouchableOpacity>
//         </KeyboardAwareScrollView> </KeyboardAvoidingView>
//         </View>
//         )}
//         </View>     
//       : ""}
//       {step === 1 ? 
//         < >
//           {rfidCode && Loading ? (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//               <ActivityIndicator size="large" color="Blue" />
//               <Text>Loading ...</Text>
//             </View>
//           ) : (
//             <View style={styles.container2}>        
//               <Ionicons name="qr-code-outline" size={100} color="#4A90E2"  />
//               <Text style={styles.title}>Scan Your RFID Card</Text>
//               <Text style={styles.subtitle}>
//                 Please place your RFID card near the reader to scan the ID.
//               </Text>
//               <TouchableOpacity style={styles.scanButton2} 
//                 onPress={handleStartScan}
//                 // disabled={!!rfidCode}
//               >
//                 <View style={styles.buttonContent}>
//                   <Text style={styles.scanButtonText}>
//                     {rfidCode && scanning ? 'Tag Scanned' : scanning ? 'Scanning...' : 'Start Scanning'}
//                   </Text>
//                   {scanning && !rfidCode && (
//                     <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
//                   )}
//                 </View>
//               </TouchableOpacity>
//               {scanning && (
//                 <TextInput
//                   ref={inputRef}
//                   value={rfidCode}
//                   onChangeText={(e)=>handleInputChange(e)}
//                   style={styles.hiddenInput}
//                   autoFocus
//                   blurOnSubmit={false}
//                 />
//               )}
//             </View>
//           )}
//         </>
//       :""}
//       {step === 2 ? 
//         < >
//           {rfidCode && Loading ? (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//               <ActivityIndicator size="large" color="Blue" />
//               <Text>Loading ...</Text>
//             </View>
//           ) : (
//             <View style={styles.container2}>        
//               <Ionicons name="qr-code-outline" size={100} color="#4A90E2"  />
//               <Text style={styles.title}>Scan Your RFID Card</Text>
//               <Text style={styles.subtitle}>
//                 Please place your RFID card near the reader to scan the ID.
//               </Text>
//               <TouchableOpacity style={styles.scanButton2} 
//                 onPress={handleStartScaning}
//                 disabled={!!rfidCode}
//               >
//                 <View style={styles.buttonContent}>
//                   <Text style={styles.scanButtonText}>
//                     {rfidCode && scanning ? 'Tag Scanned' : scanning ? 'Scanning...' : 'Start Scanning'}
//                   </Text>
//                   {scanning && !rfidCode && (
//                     <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
//                   )}
//                 </View>
//               </TouchableOpacity>
//               {scanning && (
//                 <TextInput
//                   ref={inputRef}
//                   value={rfidCode}
//                   onChangeText={(e)=>handleChange(e)}
//                   style={styles.hiddenInput}
//                   autoFocus
//                   blurOnSubmit={false}
//                 />
//               )}
//             </View>
//           )}
//         </>
//       :""}
//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={petModalStyles.overlay}>
//           <View style={petModalStyles.card}>
//             <TouchableOpacity
//               style={petModalStyles.closeBtn}
//               onPress={() => {
//                 setModalVisible(false);
//                 setStep(2);
//                 setScanning(false)
//                 setrfidCodegetData("");
//               }}
//             >
//               <MaterialIcons name="close" size={24} color="#fff" />
//             </TouchableOpacity>
//             <ScrollView showsVerticalScrollIndicator={false}contentContainerStyle={{ paddingBottom: 130 }}>
//               {petData?.Picture ? (
//                 <Image
//                   source={{ uri: petData.Picture }}
//                   style={petModalStyles.petImage}
//                 />
//               ) : (
//                 <View style={petModalStyles.placeholderImage}>
//                   <Text style={petModalStyles.placeholderText}>No Image</Text>
//                 </View>
//               )}
//               <Text style={petModalStyles.title}>🐾 Pet Information</Text>
//               <View style={petModalStyles.infoContainer}>
//                 {petData &&
//                   Object.keys(petData)
//                   .filter(
//                     (key) =>
//                       key !== "createdAt" &&
//                       key !== "id" &&
//                       key !== "updatedAt" &&
//                       key !== "Picture"
//                   )
//                   .sort((a, b) => a.localeCompare(b))
//                   .map((key) => {
//                     let value = String(petData[key]);
//                     if (key.toLowerCase() === "age") {
//                       const num = Number(value);
//                       if (!isNaN(num)) {
//                         value = `${num} ${num === 1 ? "year" : "years"}`;
//                       }
//                     }
//                     if (key.toLowerCase() === "height") {
//                       const num = Number(value);
//                       if (!isNaN(num)) {
//                         value = `${num} cm`;
//                       }
//                     }
//                     if (key.toLowerCase() === "weight") {
//                       const num = Number(value);
//                       if (!isNaN(num)) {
//                         value = `${num} kg`;
//                       }
//                     }
//                     return (
//                       <View style={petModalStyles.infoRow} key={key}>
//                         <Text style={petModalStyles.infoLabel}>
//                           {key.toLowerCase() === "rfidcode" ? "ID" : key}
//                         </Text>
//                         <Text style={petModalStyles.infoValue}>{value}</Text>
//                       </View>
//                     );
//                   })
//                 }
//               </View>
//               <TouchableOpacity style={petModalStyles.actionBtn} onPress={handleUpdate}>
//                 <MaterialIcons name="edit" size={20} color="#fff" />
//                 <Text style={petModalStyles.actionText}>Edit</Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
      
//       {/* <Modal visible={showModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.iconWrapper}>
//               <Text style={styles.warningIcon}>⚠️</Text>
//             </View>
    
//             <Text style={styles.warningTitle}>Birth Control Not Done</Text>
      
//             <Text style={styles.warningText}>
//               This dog has not had birth control. Please provide a reason before proceeding.
//             </Text>
//             <View style={[styles.input,Error.reason && { borderColor: 'red', borderWidth: 1 }]}>
//             <TextInput
//               placeholder="Enter reason..."
//               value={reason}
//               onChangeText={setReason}
//               multiline
//               placeholderTextColor="#888"
//             />
      
//             </View>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity style={[styles.button, styles.confirmBtn]} onPress={handleConfirm}>
//                 <Text style={styles.btnText}>Yes, Proceed</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => [setShowModal(false),setLoading(false)]}>
//                 <Text style={styles.btnText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal> */}
//       <Modal visible={showModal} transparent animationType="fade">
//   <View style={neatModalStyles.overlay}>
//     <View style={neatModalStyles.card}>
      
//       {/* Warning Icon */}
//       <View style={neatModalStyles.iconCircle}>
//         <Text style={neatModalStyles.iconText}>⚠️</Text>
//       </View>

//       {/* Title */}
//       <Text style={neatModalStyles.title}>Birth Control Not Done</Text>

//       {/* Description */}
//       <Text style={neatModalStyles.description}>
//         This dog has not had birth control. Please provide a reason before proceeding.
//       </Text>

//       {/* Input */}
//       <TextInput
//         style={[
//           neatModalStyles.inputBox,
//           Error.reason && { borderColor: "red" }
//         ]}
//         placeholder="Enter reason..."
//         placeholderTextColor="#999"
//         value={reason}
//         onChangeText={setReason}
//         multiline
//       />

//       {/* Buttons */}
//       <View style={neatModalStyles.buttonRow}>
//         <TouchableOpacity
//           style={[neatModalStyles.button, neatModalStyles.confirmBtn]}
//           onPress={handleConfirm}
//         >
//           <Text style={neatModalStyles.btnText}>Yes, Proceed</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[neatModalStyles.button, neatModalStyles.cancelBtn]}
//           onPress={() => {
//             setShowModal(false);
//             setLoading(false);
//           }}
//         >
//           <Text style={neatModalStyles.btnText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   </View>
// </Modal>

      
//       <Toast config={toastConfig} />
//     </View>
//     )}</View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f7fa",
//   },
//   headerContainer: {
//     backgroundColor: '#192d43',
//     paddingTop: 30,
//     paddingBottom: 15,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     position: 'relative',
//     marginTop: 33,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//     top:-9,
//   },
//   settingsButton: {
//     position: 'absolute',
//     top:17,
//     right: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   welcomeCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   welcomeTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   welcomeText: {
//     fontSize: 15,
//     color: '#666',
//     lineHeight: 22,
//   },
//   actionsContainer: {
//     flexDirection: 'column',
//     gap: 20,
//   },
//   actionButton: {
//     borderRadius: 12,
//     padding: 25,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   registerButton: {
//     backgroundColor: '#4CAF50',
//   },
//   scanButton: {
//     backgroundColor: '#2196F3',
//   },
//   buttonIcon: {
//     marginBottom: 15,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   actionButtonSubtext: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontSize: 14,
//   },
// gradientBackground: {
//   flex: 1,
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   paddingHorizontal: 20,
//   position: 'relative',
// },
// label: {
//   fontWeight: '600',
//   marginBottom: 5,
//   marginTop: 10,
//   color: '#333'
// },
// input: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 8,
//   padding: 10,
//   backgroundColor: '#fff',
//   marginBottom: 3
// },
// radioBtn: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginRight: 20
// },
// radioText: {
//   marginLeft: 5,
//   fontSize: 15,
//   color: '#333'
// }
// ,container2: {
//     flex: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginTop: 20,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//     color: '#666',
//     paddingHorizontal: 20,
//   },
//   scanButton2: {
//     marginTop: 30,
//     backgroundColor: '#4A90E2',
//     paddingVertical: 15,
//     paddingHorizontal: 60,
//     borderRadius: 8,
//   },
//   scanButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   scannerContainer : {width: '100%',alignItems: 'center',marginTop: 20},
//   scannerVisual    : {width: 200,height: 200,borderRadius: 20,backgroundColor: '#f5f5f5',borderWidth: 2,borderColor: '#e0e0e0',justifyContent: 'center',alignItems: 'center',overflow: 'hidden',marginBottom: 30,position: 'relative',},
//   hiddenInput      : {position: 'absolute',opacity: 0,height: 0,width: 0,}, 
//   scanButtonDisabled :{backgroundColor: '#4CAF50',},
//   loadingIndicator   :{marginLeft: 10,},
//   controlsContainer :{width: '100%',alignItems: 'center',},
//   scanLine         :{position: "absolute",top: 0,width: "100%",height: 4,backgroundColor: "red",opacity: 0.8,},
//   successIcon       :{backgroundColor: 'rgba(255,255,255,0.9)',borderRadius: 30,},
// buttonContent: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
//   inputWrapper2      : {width:"48%",justifyContent: 'center',borderWidth: 1,borderColor: '#ddd',borderRadius: 8,height: 50,paddingHorizontal: 10,backgroundColor: '#fff',marginBottom: 12,}, 

//   Imagecontainer: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 20
//   },
//   imagePicker: {
//     height: 150,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//     overflow: 'hidden'
//   },
//   petImage: {
//     width: '100%',
//     height: '100%'
//   },
//   uploadText: {
//     color: '#888',
//     marginTop: 5
//   },
// greenBorder: {
//   borderColor: '#4CAF50', // Green border when selected
//   // backgroundColor: 'rgba(76, 175, 80, 0.1)' // Light green background
// },
// redBorder: {
//   borderColor: '#F44336', // Red border when selected
//   // backgroundColor: 'rgba(244, 67, 54, 0.1)' // Light red background
// },
//   modalBackground : {flex: 1,backgroundColor: "rgba(0,0,0,0.5)",justifyContent: "center",alignItems: "center",},
//   modalContainer  : {width: "90%",backgroundColor: "#fff",borderRadius: 10,padding: 20,maxHeight: "80%",},
//   row             : {flexDirection: "row",marginVertical: 5},
//   keyText         : {fontWeight: "bold",fontSize: 18,color: "black",fontFamily: "sans-serif",width: 180,},
//   valueText       : {fontSize: 18,color: "black",flexShrink: 1,},
//   buttonText      : {color: "#fff",fontSize: 16,marginLeft: 5,},
//   actionRow       : {flexDirection: "row",justifyContent: "space-around",marginTop: 20,},
//   editButton      : {flexDirection: "row",alignItems: "center",backgroundColor: "orange",paddingVertical: 8,paddingHorizontal: 15,borderRadius: 5,},

  
//  modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     width: '85%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   iconWrapper: {
//     backgroundColor: '#FFF3CD',
//     padding: 15,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   warningIcon: {
//     fontSize: 28,
//   },
//   warningTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   warningText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 10,
//     width: '100%',
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   confirmBtn: {
//     backgroundColor: '#28a745',
//   },
//   cancelBtn: {
//     backgroundColor: '#dc3545',
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// hospitalDetailRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginVertical: 8,
// },
// hospitalText: {
//   fontSize: 15,
//   marginLeft: 10,
//   color: '#555',
//   flexShrink: 1,
// },hospitalInfoContainer: {
//   width: '100%',
//   paddingHorizontal: 16,
//   marginBottom: 24,
// },
// hospitalCard: {
//   backgroundColor: '#fff',
//   borderRadius: 12,
//   padding: 20,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.1,
//   shadowRadius: 8,
//   elevation: 5,
// },
// hospitalHeader: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 20,
//   paddingBottom: 16,
//   borderBottomWidth: 1,
//   borderBottomColor: '#f0f0f0',
// },
// iconContainer: {
//   backgroundColor: '#007bff',
//   width: 48,
//   height: 48,
//   borderRadius: 24,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginRight: 12,
// },
// hospitalTitle: {
//   fontSize: 20,
//   fontWeight: '700',
//   color: '#333',
// },
// detailSection: {
//   marginBottom: 18,
// },
// iconTextRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 6,
// },
// sectionLabel: {
//   fontSize: 16,
//   fontWeight: '600',
//   color: '#555',
//   marginLeft: 8,
// },
// sectionValue: {
//   fontSize: 15,
//   color: '#666',
//   lineHeight: 22,
//   paddingLeft: 36, // Align with icon
// },
// contactButton: {
//   flexDirection: 'row',
//   backgroundColor: '#007bff',
//   paddingVertical: 12,
//   paddingHorizontal: 16,
//   borderRadius: 8,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 12,
// },
// contactButtonText: {
//   color: '#fff',
//   fontWeight: '600',
//   marginLeft: 8,
//   fontSize: 15,
// },
// });
















// const petModalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 20,
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//     position: "relative",
//   },
//   closeBtn: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     backgroundColor: "#e74c3c",
//     borderRadius: 30,
//     padding: -3,
//     zIndex: 10,
//   },
//   petImage: {
//     width: '60%',
//     height: '20%',
//     borderRadius: 75,
//     alignSelf: "center",
//     marginBottom: 15,
//     borderWidth: 2,
//     borderColor: "#A5BFDCFF",
//   },
//   placeholderImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#eee",
//     justifyContent: "center",
//     alignSelf: "center",
//     marginBottom: 15,
//   },
//   placeholderText: {
//     textAlign: "center",
//     color: "#999",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#4A90E2",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   infoContainer: {
//     marginBottom: 20,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   infoLabel: {
//     fontWeight: "600",
//     fontSize: 16,
//     color: "#333",
//     width:"70%"
//   },
//   infoValue: {
//     fontSize: 16,
//     color: "#555",
//     maxWidth: "60%",
//     textAlign: "right",
//   },
//   actionBtn: {
//     flexDirection: "row",
//     backgroundColor: "#4A90E2",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     alignItems: "center",
//     alignSelf: "center",
//   },
//   actionText: {
//     color: "#fff",
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });








// const neatModalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     width: "100%",
//     maxWidth: 350,
//     alignItems: "center",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//   },
//   iconCircle: {
//     backgroundColor: "#FFE5E5",
//     borderRadius: 50,
//     padding: 15,
//     marginBottom: 15,
//   },
//   iconText: {
//     fontSize: 28,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#E74C3C",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: "#555",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   inputBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     width: "100%",
//     minHeight: 60,
//     textAlignVertical: "top",
//     marginBottom: 15,
//     fontSize: 14,
//     backgroundColor: "#FAFAFA",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 10,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   confirmBtn: {
//     backgroundColor: "#27AE60",
//   },
//   cancelBtn: {
//     backgroundColor: "#E74C3C",
//   },
//   btnText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Image,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import Toast, { BaseToast } from "react-native-toast-message";
import { addDoc, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { valuedb } from "../../../src/firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function IndexPage() {
  // ---------- UI/State ----------
  const [step, setStep] = useState(0);
  const [openArea, setOpenArea] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [LoadingData, setLoadingData] = useState(false);
  const [rfidCode, setRfidCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [Register, SetRegister] = useState("Submit");
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ---------- Params / Email (FIXED) ----------
  const params = useLocalSearchParams();
  const routeEmail =
    typeof params?.email === "string"
      ? params.email
      : Array.isArray(params?.email)
      ? params.email[0]
      : null;
  const [email, setEmail] = useState(routeEmail);

  const [reason, setReason] = useState("");
  const [UserData, setUserData] = useState([]);

  const [petData, setPetData] = useState({
    Picture: "",
    PetName: "",
    Area: null,
    PetCategory: "",
    Height: "",
    Weight: "",
    Age: "",
    Color: "",
    BirthControl: "Yes",
    Gender: "Female",
    RfidCode: "",
  });

  const [rfidCodegetData, setrfidCodegetData] = useState("");
  const [areaItems, setAreaItems] = useState([]);

  const [categoryItems, setCategoryItems] = useState([
    { label: "House Dog", value: "House Dog" },
    { label: "Street Dog", value: "Street Dog" },
  ]);

  const [formData, setFormData] = useState({
    Picture: "",
    PetName: "",
    Area: null,
    PetCategory: "",
    Height: "",
    Weight: "",
    Age: "",
    Color: "",
    BirthControl: "Yes",
    Gender: "Female",
  });

  const [Error, Formerror] = useState({
    Picture: "",
    PetName: "",
    Area: "",
    PetCategory: "",
    Height: "",
    Weight: "",
    Age: "",
    Color: "",
    BirthControl: "",
    Gender: "",
    reason: "",
  });

  const inputRef = useRef(null);

  // ---------- Fetch hospital/centre data by email (FIXED) ----------
  useEffect(() => {
    if (!email) return;
  console.log(email)

    const fetchData = async () => {
      setLoading(true);
      try {
        const qy = query(collection(valuedb, "cityandcentres"), where("Email.email", "==", email));
        const querySnapshot = await getDocs(qy);
        console.log(querySnapshot)
        if (!querySnapshot.empty) {
          const documents = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          console.log(documents)
          setUserData(documents);

          // Build Area items from docs (if "area" present)
          const result = documents
            .map((item) => item?.area)
            .filter(Boolean)
            .map((a) => ({ label: a, value: a }));
          if (result.length) setAreaItems(result);
        } else {
          Toast.show({
            type: "warning",
            text1: "No hospital record found",
            text2: "Provided email didn’t match any centre.",
            visibilityTime: 1500,
          });
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
        Toast.show({
          type: "error",
          text1: "Error fetching centre data",
          visibilityTime: 1500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  // ---------- Toast config ----------
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={styles.toastSuccess}
        text1Style={styles.toastText1Success}
        text2Style={styles.toastText2Success}
        renderLeadingIcon={() => (
          <Ionicons name="checkmark-circle" size={28} color="#28a745" style={{ marginLeft: 10 }} />
        )}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={styles.toastError}
        text1Style={styles.toastText1Error}
        text2Style={styles.toastText2Error}
        renderLeadingIcon={() => (
          <Ionicons name="close-circle" size={28} color="#FF3B30" style={{ marginLeft: 10 }} />
        )}
      />
    ),
    warning: (props) => (
      <BaseToast
        {...props}
        style={styles.toastWarn}
        text1Style={styles.toastText1Warn}
        text2Style={styles.toastText2Warn}
        renderLeadingIcon={() => (
          <Ionicons name="warning" size={28} color="#ffc107" style={{ marginLeft: 10 }} />
        )}
      />
    ),
  };

  // ---------- Scan (Register new) ----------
  const handleStartScan = async () => {
    setScanning(false);
    inputRef.current?.focus();
    setLoading(false);
    setStep(3);
    try {
      if (UserData?.length) {
        const result = UserData.map((item) => ({
          label: item["area"],
          value: item["area"],
        })).filter((x) => x.value);
        if (result.length) setAreaItems(result);
      }
    } catch (error) {
      console.error("Error building area list:", error);
    }
  };

  // ---------- Scan (Find existing) ----------
  const handleStartScaning = () => {
    setScanning(true);
    setTimeout(() => {
      setStep(6);
      inputRef.current?.focus();
    }, 800);
  };

  // ---------- RFID input (new registration) ----------
  const handleInputChange = async (text) => {
    // Demo: force a code (replace with text if you have a keyboard-wedge scanner)
    setRfidCode("0003826505");

    if (text.length >= 8) {
      setScanning(false);
      setLoading(true);
      try {
        const qy = query(
          collection(valuedb, "DogFullDataBase"),
          where("RfidCode", "==", "0003826505")
        );
        const querySnapshot = await getDocs(qy);
        if (!querySnapshot.empty) {
          setRfidCode("");
          Toast.show({
            type: "error",
            text1: "⚠ RFID Already Exists!",
            text2: "Give New RFID Number.",
            visibilityTime: 1200,
          });
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setStep(2);
          setLoading(false);
        }, 800);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "⚠ Error checking RFID!",
          text2: "Please try again.",
          visibilityTime: 1200,
        });
        setLoading(false);
      }
    }
  };

  // ---------- Camera / Image Picker (FIXED web branch) ----------
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission is required to access photos");
      return;
    }

    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            setFormData((prev) => ({
              ...prev,
              Picture: evt?.target?.result || "",
            }));
            Formerror((prev) => ({ ...prev, Picture: "" }));
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setFormData((prev) => ({ ...prev, Picture: result.assets[0].uri }));
        Formerror((prev) => ({ ...prev, Picture: "" }));
      }
    }
  };

  // ---------- Validation ----------
  const validateFields = () => {
    let tempErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        tempErrors[key] = `${key} is required`;
        isValid = false;
      }
    });
    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "⚠ Required Fields Missing!",
        text2: "Please fill all mandatory fields.",
        visibilityTime: 1200,
      });
    }
    Formerror((prev) => ({ ...prev, ...tempErrors }));
    return isValid;
  };

  // ---------- Submit (Create / Update) ----------
  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      if (Register === "Submit") {
        setLoadingData(true);
        if (formData.BirthControl === "Yes") {
          const employeeRefs = collection(valuedb, "DogFullDataBase");
          await addDoc(employeeRefs, {
            ...formData,
            RfidCode: "0003832937",
            City: UserData?.[0]?.city || "",
            Address: UserData?.[0]?.Address || "",
            createdAt: new Date().toISOString(),
          });

          setTimeout(() => {
            Toast.show({
              type: "success",
              text1: `✅ Pet Data Saved successfully!`,
              text2: "Pet Data Stored In Database",
              visibilityTime: 1200,
            });
            resetForm();
            setLoadingData(false);
          }, 1000);
        } else {
          setShowModal(true);
          setLoadingData(false);
        }
      } else {
        // Update flow
        setLoadingData(true);
        if (formData.BirthControl === "Yes") {
          try {
            const employeeref = collection(valuedb, "DogFullDataBase");
            const qy = query(employeeref, where("RfidCode", "==", petData.RfidCode));
            const snapshot = await getDocs(qy);
            if (!snapshot.empty) {
              const docId = snapshot.docs[0].id;
              const petDocRef = doc(valuedb, "DogFullDataBase", docId);
              await updateDoc(petDocRef, {
                ...formData,
                City: UserData?.[0]?.city || "",
                Address: UserData?.[0]?.Address || "",
                updatedAt: new Date().toISOString(),
              });

              setTimeout(() => {
                Toast.show({
                  type: "success",
                  text1: "✅ Pet data updated successfully!",
                  text2: "Pet Data Stored In Database",
                  visibilityTime: 1200,
                });
                resetForm();
                SetRegister("Submit");
                setLoadingData(false);
              }, 1000);
              setrfidCodegetData("");
            } else {
              Toast.show({
                type: "warning",
                text1: `No record found for this RFID Code.`,
                visibilityTime: 1200,
              });
              setLoadingData(false);
            }
          } catch (error) {
            console.error("❌ Error updating pet data:", error);
            setLoadingData(false);
          }
        } else {
          setShowModal(true);
          setLoadingData(false);
        }
      }
    } catch (error) {
      console.error("Error adding/updating data: ", error);
      setLoadingData(false);
    }
  };

  const resetForm = () => {
    setRfidCode("");
    setStep(0);
    setFormData({
      PetName: "",
      Area: null,
      PetCategory: "",
      Height: "",
      Weight: "",
      Age: "",
      Color: "",
      BirthControl: "Yes",
      Gender: "Female",
      Picture: "",
    });
    Formerror({
      Picture: "",
      PetName: "",
      Area: "",
      PetCategory: "",
      Height: "",
      Weight: "",
      Age: "",
      Color: "",
      BirthControl: "",
      Gender: "",
      reason: "",
    });
  };

  // ---------- Confirm when BirthControl = No ----------
  const handleConfirm = async () => {
    if (!reason.trim()) {
      Formerror((prev) => ({ ...prev, reason: "Reason is required" }));
      return;
    }
    setLoading(true);
    const employeeRefs = collection(valuedb, "DogFullDataBase");
    await addDoc(employeeRefs, {
      ...formData,
      RfidCode: "0003832937",
      City: UserData?.[0]?.city || "",
      Address: UserData?.[0]?.Address || "",
      BirthControlReason: reason,
      createdAt: new Date().toISOString(),
    });

    setShowModal(false);
    setReason("");
    setTimeout(() => {
      resetForm();
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "✅ Pet Data Saved successfully!",
        text2: "Pet Data Stored In Database",
        visibilityTime: 1200,
      });
    }, 800);
  };

  // ---------- When step 6: find existing pet by RFID, show modal ----------
  useEffect(() => {
    const run = async () => {
      if (step !== 6) return;
      setLoading(true);
      try {
        const employeeref = collection(valuedb, "DogFullDataBase");
        const qy = query(employeeref, where("RfidCode", "==", "0003832937"));
        const snapshot = await getDocs(qy);
        const result = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
        setTimeout(() => {
          if (result.length > 0) {
            setPetData(result[0]);
            setModalVisible(true);
          } else {
            setrfidCodegetData("");
            Toast.show({
              type: "error",
              text1: "⚠ There Is No Record To Display!",
              visibilityTime: 1200,
            });
          }
          setLoading(false);
        }, 800);
      } catch (e) {
        setLoading(false);
      }
    };
    run();
  }, [step]);

  const handleUpdate = () => {
    // Copy petData → formData for editing
    setFormData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        if (petData[k] !== undefined) updated[k] = petData[k];
      });
      return updated;
    });

    // Clear errors
    Formerror({
      ...Error,
      PetName: "",
      Picture: "",
      Age: "",
      Area: "",
      PetCategory: "",
      Height: "",
      Weight: "",
      Color: "",
      BirthControl: "",
      Gender: "",
      reason: "",
    });

    // Area item ensure present
    if (petData?.Area) {
      setAreaItems((prev) => {
        const exists = prev.some((it) => it.value === petData.Area);
        return exists ? prev : [{ label: petData.Area, value: petData.Area }, ...prev];
      });
    }

    setStep(3);
    SetRegister("Update");
    setModalVisible(false);
    setScanning(false);
  };

  // ---------- UI ----------
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {Loading ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading ...</Text>
        </View>
      ) : (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#007bff" />
          <View style={[styles.headerContainer,{ marginLeft: -30 }]}>
            {step === 0 || Register === "Update" ? (
              <View style={{ width: 24 }} />
            ) : (
              <TouchableOpacity
                style={[styles.settingsButton, { marginRight: 310 }]}
                onPress={() => {
                  setRfidCode("");
                  setStep(0);
                  setScanning(false);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>Client Registration</Text>
            <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/")} activeOpacity={0.7}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Home step */}
          {step === 0 ? (
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                {UserData && UserData.length > 0 && (
                  <View style={styles.hospitalInfoContainer}>
                    <View style={styles.hospitalCard}>
                      <View style={styles.hospitalHeader}>
                        <View style={styles.iconContainer}>
                          <Ionicons name="medkit" size={28} color="#fff" />
                        </View>
                        <Text style={styles.hospitalTitle}>Hospital Information</Text>
                      </View>

                      <View style={styles.detailSection}>
                        <View style={styles.iconTextRow}>
                          <Ionicons name="location" size={22} color="#007bff" />
                          <Text style={styles.sectionLabel}>Address</Text>
                        </View>
                        <Text style={styles.sectionValue}>{UserData[0]["Address"]}</Text>
                      </View>

                      <View style={styles.detailSection}>
                        <View style={styles.iconTextRow}>
                          <Ionicons name="person" size={22} color="#007bff" />
                          <Text style={styles.sectionLabel}>Veterinary Doctor</Text>
                        </View>
                        <Text style={styles.sectionValue}>Dr. {UserData[0]["Name"]}</Text>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.registerButton]}
                    onPress={() => {
                      setStep(1);
                      Formerror({
                        ...Error,
                        PetName: "",
                        Picture: "",
                        Age: "",
                        Area: "",
                        PetCategory: "",
                        Height: "",
                        Weight: "",
                        Color: "",
                      });
                    }}
                  >
                    <Ionicons name="paw" size={28} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.actionButtonText}>Register Pet</Text>
                    <Text style={styles.actionButtonSubtext}>Add new pet to system</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.actionButton, styles.scanButton]} onPress={() => setStep(2)}>
                    <Ionicons name="scan" size={28} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.actionButtonText}>Scan Pet</Text>
                    <Text style={styles.actionButtonSubtext}>Find existing pet record</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          ) : null}

          {/* Form step */}
          {step === 3 ? (
            <View style={{ flex: 1 }}>
              {LoadingData ? (
                <View style={styles.centerLoading}>
                  <ActivityIndicator size="large" color="#007bff" />
                  <Text style={styles.loadingText}>Data Submitting ...</Text>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={80}
                  >
                    <KeyboardAwareScrollView
                      style={{ flex: 1, backgroundColor: "#f5f7fa" }}
                      contentContainerStyle={{ padding: 20 }}
                      enableOnAndroid={true}
                      extraScrollHeight={100}
                      keyboardShouldPersistTaps="handled"
                    >
                      <View style={styles.Imagecontainer}>
                        <Text style={styles.header}>Register Pet</Text>
                        <TouchableOpacity
                          style={[styles.imagePicker, Error.Picture && { borderColor: "red", borderWidth: 1 }]}
                          onPress={takePhoto}
                          activeOpacity={0.8}
                        >
                          {formData.Picture ? (
                            <Image source={{ uri: formData.Picture }} style={styles.petImage} />
                          ) : (
                            <>
                              <Ionicons name="camera" size={40} color="#888" />
                              <Text style={styles.uploadText}>Take Pet Picture</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </View>

                      {/* Pet Name */}
                      <Text style={styles.label}>Pet Name</Text>
                      <TextInput
                        style={[styles.input, { color: "#000" }, Error.PetName && { borderColor: "red", borderWidth: 1 }]}
                        placeholder="Enter pet name"
                        placeholderTextColor="#888"
                        value={formData.PetName}
                        onChangeText={(e) => {
                          setFormData({ ...formData, PetName: e });
                          Formerror({ ...Error, PetName: "" });
                        }}
                      />

                      {/* Area */}
                      <View style={{ height: 85, zIndex: 2 }}>
                        <Text style={styles.label}>Area</Text>
                        <DropDownPicker
                          open={openArea}
                          value={formData.Area}
                          items={areaItems}
                          setOpen={setOpenArea}
                          setItems={setAreaItems}
                          // onChangeValue={(val) => {
                          //   setFormData((prev) => ({ ...prev, Area: val }));
                          //   Formerror({ ...Error, Area: "" });
                          // }}
                          
                  setValue={(callback) => {
                    setFormData(prev => ({
                      ...prev,
                      Area: callback(prev.Area)
                    }));
                    Formerror({ ...Error, Area: '' });
                  }}
                          placeholder="Select Area"
                          style={[{ borderColor: "#ccc", minHeight: 40 }, Error.Area && { borderColor: "red", borderWidth: 1 }]}
                          dropDownContainerStyle={{ borderColor: "#ccc", maxHeight: 200 }}
                          listItemContainerStyle={{ height: 40 }}
                        />
                      </View>

                      {/* Category */}
                      <View style={{ height: 85, zIndex: 1 }}>
                        <Text style={styles.label}>Category</Text>
                        <DropDownPicker
                          open={openCategory}
                          value={formData.PetCategory}
                          items={categoryItems}
                          setOpen={setOpenCategory}
                          setItems={setCategoryItems}
                          // onChangeValue={(val) => {
                          //   setFormData((prev) => ({ ...prev, PetCategory: val }));
                          //   Formerror({ ...Error, PetCategory: "" });
                          // }}
                          
                  setValue={(callback) => {
                    setFormData(prev => ({
                      ...prev,
                      PetCategory: callback(prev.PetCategory)
                    }));
                    Formerror({ ...Error, PetCategory: '' });
                  }}
                          placeholder="Select Category"
                          style={[
                            { borderColor: "#ccc", minHeight: 40 },
                            Error.PetCategory && { borderColor: "red", borderWidth: 1 },
                          ]}
                          dropDownContainerStyle={{ borderColor: "#ccc", maxHeight: 200 }}
                          listItemContainerStyle={{ height: 40 }}
                        />
                      </View>

                      {/* Height & Weight */}
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                          <Text style={styles.label}>Height (cm)</Text>
                          <TextInput
                            style={[styles.input, { color: "#000" }, Error.Height && { borderColor: "red", borderWidth: 1 }]}
                            placeholder="Enter Height (cm)"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            value={formData.Height}
                            onChangeText={(e) => {
                              setFormData({ ...formData, Height: e });
                              Formerror({ ...Error, Height: "" });
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Weight (kg)</Text>
                          <TextInput
                            style={[styles.input, { color: "#000" }, Error.Weight && { borderColor: "red", borderWidth: 1 }]}
                            placeholder="Enter Weight (kg)"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            value={formData.Weight}
                            onChangeText={(e) => {
                              setFormData({ ...formData, Weight: e });
                              Formerror({ ...Error, Weight: "" });
                            }}
                          />
                        </View>
                      </View>

                      {/* Age & Color */}
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                          <Text style={styles.label}>Age (years)</Text>
                          <TextInput
                            style={[styles.input, { color: "#000" }, Error.Age && { borderColor: "red", borderWidth: 1 }]}
                            placeholder="Enter age"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                            value={formData.Age}
                            onChangeText={(e) => {
                              setFormData({ ...formData, Age: e });
                              Formerror({ ...Error, Age: "" });
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Color</Text>
                          <TextInput
                            style={[styles.input, { color: "#000" }, Error.Color && { borderColor: "red", borderWidth: 1 }]}
                            placeholder="Enter Color"
                            placeholderTextColor="#888"
                            value={formData.Color}
                            onChangeText={(e) => {
                              setFormData({ ...formData, Color: e });
                              Formerror({ ...Error, Color: "" });
                            }}
                          />
                        </View>
                      </View>

                      {/* Birth Control & Gender (FIXED styles) */}
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                          <Text style={styles.label}>Birth Control</Text>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {["Yes", "No"].map((option) => {
                              const active = formData.BirthControl === option;
                              return (
                                <TouchableOpacity
                                  key={option}
                                  style={[styles.radioBtn, active ? styles.greenBorder : styles.redBorder]}
                                  onPress={() => {
                                    setFormData({ ...formData, BirthControl: option });
                                    Formerror({ ...Error, BirthControl: "" });
                                  }}
                                >
                                  <Ionicons
                                    name={active ? "radio-button-on" : "radio-button-off"}
                                    size={22}
                                    color={option === "Yes" ? "#4CAF50" : "#F44336"}
                                  />
                                  <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Gender</Text>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {["Male", "Female"].map((option) => {
                              const active = formData.Gender === option;
                              return (
                                <TouchableOpacity
                                  key={option}
                                  style={[styles.radioBtn, active ? styles.greenBorder : styles.redBorder]}
                                  onPress={() => {
                                    setFormData({ ...formData, Gender: option });
                                    Formerror({ ...Error, Gender: "" });
                                  }}
                                >
                                  <Ionicons
                                    name={active ? "radio-button-on" : "radio-button-off"}
                                    size={22}
                                    color={option === "Male" ? "#4CAF50" : "#F44336"}
                                  />
                                  <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                        <Text style={styles.submitText}>{Register}</Text>
                      </TouchableOpacity>
                    </KeyboardAwareScrollView>
                  </KeyboardAvoidingView>
                </View>
              )}
            </View>
          ) : null}

          {/* Step 1: Scan for new */}
          {step === 1 ? (
            <>
              <View style={styles.container2}>
                <Ionicons name="qr-code-outline" size={100} color="#4A90E2" />
                <Text style={styles.title}>Scan Your RFID Card</Text>
                <Text style={styles.subtitle}>Please place your RFID card near the reader to scan the ID.</Text>
                <TouchableOpacity style={styles.scanButton2} onPress={handleStartScan}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.scanButtonText}>
                      {rfidCode && scanning ? "Tag Scanned" : scanning ? "Scanning..." : "Start Scanning"}
                    </Text>
                    {scanning && !rfidCode && <ActivityIndicator color="#fff" style={styles.loadingIndicator} />}
                  </View>
                </TouchableOpacity>
                {scanning && (
                  <TextInput
                    ref={inputRef}
                    value={rfidCode}
                    onChangeText={(e) => handleInputChange(e)}
                    style={styles.hiddenInput}
                    autoFocus
                    blurOnSubmit={false}
                  />
                )}
              </View>
            </>
          ) : null}

          {/* Step 2: Scan to find existing */}
          {step === 2 ? (
            <>
              <View style={styles.container2}>
                <Ionicons name="qr-code-outline" size={100} color="#4A90E2" />
                <Text style={styles.title}>Scan Your RFID Card</Text>
                <Text style={styles.subtitle}>Please place your RFID card near the reader to scan the ID.</Text>
                <TouchableOpacity style={styles.scanButton2} onPress={handleStartScaning} disabled={!!rfidCode}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.scanButtonText}>
                      {rfidCode && scanning ? "Tag Scanned" : scanning ? "Scanning..." : "Start Scanning"}
                    </Text>
                    {scanning && !rfidCode && <ActivityIndicator color="#fff" style={styles.loadingIndicator} />}
                  </View>
                </TouchableOpacity>
                {scanning && (
                  <TextInput
                    ref={inputRef}
                    value={rfidCode}
                    onChangeText={() => {}}
                    style={styles.hiddenInput}
                    autoFocus
                    blurOnSubmit={false}
                  />
                )}
              </View>
            </>
          ) : null}

          {/* Pet Info Modal */}
          <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
            <View style={petModalStyles.overlay}>
              <View style={petModalStyles.card}>
                <TouchableOpacity
                  style={petModalStyles.closeBtn}
                  onPress={() => {
                    setModalVisible(false);
                    setStep(2);
                    setScanning(false);
                    setrfidCodegetData("");
                  }}
                >
                  <MaterialIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
                  {petData?.Picture ? (
                    <Image source={{ uri: petData.Picture }} style={petModalStyles.petImage} />
                  ) : (
                    <View style={petModalStyles.placeholderImage}>
                      <Text style={petModalStyles.placeholderText}>No Image</Text>
                    </View>
                  )}

                  <Text style={petModalStyles.title}>🐾 Pet Information</Text>

                  <View style={petModalStyles.infoContainer}>
                    {petData &&
                      Object.keys(petData)
                        .filter((key) => !["createdAt", "id", "updatedAt", "Picture"].includes(key))
                        .sort((a, b) => a.localeCompare(b))
                        .map((key) => {
                          let value = String(petData[key] ?? "");
                          const lower = key.toLowerCase();
                          const n = Number(value);

                          if (lower === "age" && !isNaN(n)) value = `${n} ${n === 1 ? "year" : "years"}`;
                          if (lower === "height" && !isNaN(n)) value = `${n} cm`;
                          if (lower === "weight" && !isNaN(n)) value = `${n} kg`;
                          if (lower === "rfidcode") key = "ID";

                          return (
                            <View style={petModalStyles.infoRow} key={key}>
                              <Text style={petModalStyles.infoLabel}>{key}</Text>
                              <Text style={petModalStyles.infoValue}>{value || "—"}</Text>
                            </View>
                          );
                        })}
                  </View>

                  <TouchableOpacity style={petModalStyles.actionBtn} onPress={handleUpdate}>
                    <MaterialIcons name="edit" size={20} color="#fff" />
                    <Text style={petModalStyles.actionText}>Edit</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Birth Control Reason Modal */}
          <Modal visible={showModal} transparent animationType="fade">
            <View style={neatModalStyles.overlay}>
              <View style={neatModalStyles.card}>
                <View style={neatModalStyles.iconCircle}>
                  <Text style={neatModalStyles.iconText}>⚠️</Text>
                </View>

                <Text style={neatModalStyles.title}>Birth Control Not Done</Text>

                <Text style={neatModalStyles.description}>
                  This dog has not had birth control. Please provide a reason before proceeding.
                </Text>

                <TextInput
                  style={[neatModalStyles.inputBox, Error.reason && { borderColor: "red" }]}
                  placeholder="Enter reason..."
                  placeholderTextColor="#999"
                  value={reason}
                  onChangeText={(t) => {
                    setReason(t);
                    Formerror((prev) => ({ ...prev, reason: "" }));
                  }}
                  multiline
                />

                <View style={neatModalStyles.buttonRow}>
                  <TouchableOpacity style={[neatModalStyles.button, neatModalStyles.confirmBtn]} onPress={handleConfirm}>
                    <Text style={neatModalStyles.btnText}>Yes, Proceed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[neatModalStyles.button, neatModalStyles.cancelBtn]}
                    onPress={() => {
                      setShowModal(false);
                      setLoading(false);
                    }}
                  >
                    <Text style={neatModalStyles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Toast config={toastConfig} />
        </>
      )}
    </View>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  // headerContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#007bff",
  //   paddingHorizontal: 12,
  //   paddingVertical: 12,
  //   justifyContent: "space-between",
  // },
  
  headerContainer: {
    backgroundColor: '#192d43',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    // marginTop: 33,
  },
  // headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
    top:-9,
  },
  settingsButton: {
    position: 'absolute',
    top:17,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: { flex: 1, backgroundColor: "#f5f7fa" },
  contentContainer: { padding: 16 },

  hospitalInfoContainer: { marginTop: 8 },
  hospitalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  hospitalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  hospitalTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  detailSection: { marginBottom: 10 },
  iconTextRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  sectionLabel: { marginLeft: 6, color: "#007bff", fontWeight: "600" },
  sectionValue: { color: "#555", marginLeft: 28 },

  // actionsContainer: { marginTop: 18, gap: 14 },
  actionsContainer: {
    flexDirection: 'column',
    gap: 20,marginTop: 18,
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignItems: 'center',
    elevation: 4,
  },
  // actionButton: {
  // },
  registerButton: { backgroundColor: "#36a2eb" },
  scanButton: { backgroundColor: "#4bc0c0" },
  buttonIcon: { marginBottom: 6 },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  actionButtonSubtext: { color: "#eef", marginTop: 2 },

  // Step 1/2 Scanner
  container2: { alignItems: "center", paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10, color: "#333" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 6 },
  scanButton2: {
    marginTop: 18,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 12,
  },
  buttonContent: { flexDirection: "row", alignItems: "center" },
  scanButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loadingIndicator: { marginLeft: 8 },
  hiddenInput: { height: 1, width: 1, opacity: 0 },

  // Form
  Imagecontainer: { marginBottom: 12 },
  header: { fontSize: 20, fontWeight: "800", marginBottom: 10, color: "#333" },
  imagePicker: {
    height: 170,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  petImage: { width: "100%", height: "100%", borderRadius: 12 },
  uploadText: { marginTop: 10, color: "#888" },

  label: { marginTop: 12, marginBottom: 6, color: "#333", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  greenBorder: { borderColor: "#4CAF50" },
  redBorder: { borderColor: "#ddd" },
  radioText: { marginLeft: 6, color: "#333" },

  submitBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // Loaders
  centerLoading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  loadingText: { marginTop: 8, fontSize: 16, color: "#007bff" },

  // Toast styles
  toastSuccess: {
    borderLeftColor: "#28a745",
    backgroundColor: "#eaffea",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  toastText1Success: { fontSize: 16, fontWeight: "bold", color: "#28a745" },
  toastText2Success: { fontSize: 14, color: "#155724" },

  toastError: {
    borderLeftColor: "#FF3B30",
    backgroundColor: "#ffeaea",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  toastText1Error: { fontSize: 16, fontWeight: "bold", color: "#FF3B30" },
  toastText2Error: { fontSize: 14, color: "#721c24" },

  toastWarn: {
    borderLeftColor: "#ffc107",
    backgroundColor: "#fff8e1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  toastText1Warn: { fontSize: 16, fontWeight: "bold", color: "#856404" },
  toastText2Warn: { fontSize: 14, color: "#856404" },
});

const petModalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingBottom: 10,
    elevation: 6,
    maxHeight: "80%",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#00000055",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  petImage: { width: "100%", height: 220, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  placeholderImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "#999" },
  title: { fontSize: 20, fontWeight: "800", color: "#333", paddingHorizontal: 16, paddingTop: 12, marginBottom: 6 },
  infoContainer: { paddingHorizontal: 16, paddingTop: 8 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  infoLabel: { fontWeight: "700", color: "#444", flex: 1, paddingRight: 6 },
  infoValue: { flex: 1.3, textAlign: "right", color: "#555" },
  actionBtn: {
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  actionText: { color: "#fff", fontWeight: "700" },
});

const neatModalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" },
  card: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    elevation: 6,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF1D6",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  iconText: { fontSize: 28 },
  title: { fontSize: 18, fontWeight: "800", textAlign: "center", color: "#333" },
  description: { marginTop: 8, color: "#666", textAlign: "center" },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    marginTop: 12,
    backgroundColor: "#fafafa",
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 14 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  confirmBtn: { backgroundColor: "#28a745", marginRight: 8 },
  cancelBtn: { backgroundColor: "#999", marginLeft: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
