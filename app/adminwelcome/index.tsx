// import { Ionicons } from '@expo/vector-icons';
// import { router, Stack } from 'expo-router';
// import React, { useState, useRef , useEffect} from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ScrollView,Modal, 
//   Animated
// } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { Picker } from '@react-native-picker/picker';
// import { addDoc, collection , getDocs, query, where,  doc, updateDoc} from 'firebase/firestore';
// import { MaterialIcons } from "@expo/vector-icons";   
// // client1karur@kloudoz.com
// //cleint1@123

// // karurvhathoor@kloudoz.in
// // karurvhthoor@123

// // karurvhkaniyalampatti@kloudoz.in
// // karurvhkaniyalampatti@123

// // trichykknagar@kloudoz.in
// // trichykknagar@123

// // namakkalvhnamakkal@kloudoz.in
// // namakkalvhnamakkal@123


// krishnagiribargur@gmail.com
// krishnagiribargur@123


// maduraivpc@gmail.com
// maduraivpc@1234

// maduraivhthiru@gmail.com
// maduraivhthiru@123

// mayiladuthuraicc@gmail.com
// mayiladuthuraicc@123


//mayiladuthuraivhsirkali@gmail.com
//mayiladuthuraivhsirkali@123


//nagapattinamvh@gmail.com
//nagapattinamvh@123


//nagapattinamvhvedha@gmail.com
//nagapattinamvhvedha@123


// kanyakumarivdthingal@gmail.com
// kanyakumarivdthingal@123


// krishnagirhosur@kloudoz.in
// krishnagirhosur@123


//kanyakumarivdkottaram@gmail.com
//kanyakumarivdkottaram@123



// // admin@gmail.com
// // admin@123

// export default function WelcomeScreen() {
//   const [Loading, setLoading]                 = useState(false);
//   const [step, setStep]                       = useState(0);
//   const [rfidCode, setRfidCode]               = useState("");
//   const [scanning, setScanning]               = useState(false);
//   const scanAnim                              = useRef(new Animated.Value(0)).current;
//   const [rfidCodegetData, setrfidCodegetData] = useState("");
//   const [petData, setPetData]                 = useState(null);
//   const [modalVisible, setModalVisible]       = useState(false);
//   const [popupVisible, setPopupVisible]       = useState(false);
//   const [Register, SetRegister]               = useState('Register New');
//   const [showModal, setShowModal]             = useState(false);
//   const [reason, setReason]                   = useState("");
//   const [formData, setFormData]               = useState({
//     petName :"",
//     Area: '',
//     PetCategory: '',
//     Supervisor: '',
//     Agent: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: 'Yes',
//     Gender: 'Male'
//   });
//   const [errors, setErrors]                   = useState({
//     petName :"",
//     Area: '',
//     PetCategory: '',
//     Supervisor: '',
//     Agent: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: 'Yes',
//     Gender: 'Male'

//   });
//   const [Error , Formerror] = useState({
//     petName :"",
//     Area: '',
//     PetCategory: '',
//     Supervisor: '',
//     Agent: '',
//     Height: '',
//     Weight: '',
//     Age: '',
//     Color: '',
//     BirthControl: 'Yes',
//     Gender: 'Male'
//   })

//   const inputRef = useRef(null);

//   const handleStartScan = () => {
//     setScanning(true);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 200);
//   };

//   const handleStartScaning = () => {
//     setScanning(true);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 200);
//   };

  
//   const validateFields = () => {
//     let tempErrors = {};
//     let isValid = true;
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) {
//         Toast.show({
//           type: 'error',
//           text1: "Error adding data",
//           visibilityTime: 1200,
//         });
//         tempErrors[key] = `${key} is required`;
//         isValid = false;
//       }
//     });
//     setErrors(tempErrors);
//     return isValid;
//   };
    
//   const handleSave = async() => {
//     if (!validateFields()) return; 
//     setLoading(true)
//     try {
//       if(Register === "Register New"){
//         if(formData.BirthControl === "Yes"){
//           await addDoc(employeeRefs,{
//             ...formData,RfidCode : rfidCode,
//             createdAt: new Date().toISOString()
//           })
//           setTimeout(() => {
//             Toast.show({
//               type: 'success',
//               text1: `Data Saved Succesfully!`,
//               visibilityTime: 1200,
//             });
//             setRfidCode("");
//             setLoading(false)
//             setStep(0);
//             setFormData({
//               petName :"",
//               Area: '',
//               PetCategory: '',
//               Supervisor: '',
//               Agent: '',
//               Height: '',
//               Weight: '',
//               Age: '',
//               Color: '',
//               BirthControl: 'Yes',
//               Gender: 'Male'
//             })
//           }, 2000);
//         }else{
//           setShowModal(true);
//         }
//       }else{
//           if(formData.BirthControl === "Yes"){
//             try {
//               const q = query(employeeref, where("RfidCode", "==", petData.RfidCode));
//               const snapshot = await getDocs(q);
//               if (!snapshot.empty) {
//                 const docId = snapshot.docs[0].id;
//                 await updateDoc(petDocRef, {
//                   ...formData,
//                   updatedAt: new Date().toISOString()
//                 });
//                 Toast.show({
//                   type: 'success',
//                   text1: `Pet data updated successfully!`,
//                   visibilityTime: 1200,
//                 });
//                 setrfidCodegetData("")
//               } else {
//                 Toast.show({
//                   type: 'success',
//                   text1: `No record found for this RFID Code.`,
//                   visibilityTime: 1200,
//                 });
//               }
//               setTimeout(() => {
//                 setRfidCode("");
//                 setLoading(false)
//                 setStep(0);
//                 setFormData({
//                   petName :"",
//                   Area: '',
//                   PetCategory: '',
//                   Supervisor: '',
//                   Agent: '',
//                   Height: '',
//                   Weight: '',
//                   Age: '',
//                   Color: '',
//                   BirthControl: 'Yes',
//                   Gender: 'Male'
//                 })
//               }, 2000);
//             } catch (error) {
//               console.error("❌ Error updating pet data:", error);
//             }
//           }else{
//             setShowModal(true);
//           }
//         }
//     }catch (error){
//       console.error("Error adding data: ", error); 
//     }
//   };

//   const translateY = scanAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 150],
//   });


//   const handleInputChange = async (value) => {
//     setRfidCode(value);
//     if (value.length >= 8) {
//       setScanning(false);
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           setRfidCode("");
//           Toast.show({
//             type: "error",
//             text1: "RFID Already Exists!",
//             visibilityTime: 2000,
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
//           type: "error",
//           text1: "Error checking RFID",
//           visibilityTime: 1500,
//         });
//       }
//     }
//   };

//   const DataSnapshot = () =>{
//     setStep(4);
//   }

//   const handleInputChanging = (value) => {
//     setrfidCodegetData(value);
//     if(value.length >= 8){ 
//       setScanning(false);
//     }
//     setTimeout(() => {
//       setStep(5);
//     }, 1000);
//   };

    
//   useEffect(() => {
//     if (step === 5) {
//       setLoading(true);
//       const q = query(employeeref, where("RfidCode", "==", rfidCodegetData));
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
//             setLoading(false)
//             setrfidCodegetData("");
//             setStep(4)
//             Toast.show({
//               type: "error",
//               text1: "There Is No Record To Display",
//               visibilityTime: 1500,
//             });
//             }
//             setLoading(false);
//           }, 2000);
//         })
//         .catch((error) => {
//           setLoading(false);
//         });
//     }
//   },[step]);

//   const handleEdit = () => {
//     setPopupVisible(true)
//   };

//   const handleYes = () => {
//     setPopupVisible(false);
//     setStep(2);
//     setModalVisible(false);
//     SetRegister("Edit")
//     setFormData((prev) => {
//       const updatedData = {};
//       Object.keys(prev).forEach((key) => {
//         if (petData.hasOwnProperty(key)) {
//           updatedData[key] = petData[key];
//         } else {
//           updatedData[key] = prev[key]; // keep old value if not in petData
//         }
//       });

//       return updatedData;
//     });
//   };

//   const handleNo = () => {
//     setPopupVisible(false);
//   };

  
//   const handleConfirm = async () => {
//     if (!reason.trim()) {
//       console.log(reason)
//       let tempErrors = {};
//       tempErrors["reason"] = `Reason is required`;
//       setErrors(tempErrors);
//     }

//     // Save to Firestore with reason
//     await addDoc(employeeRefs, {
//       ...formData,
//       RfidCode: rfidCode,
//       BirthControlReason: reason, // save reason here
//       createdAt: new Date().toISOString(),
//     });
//     setShowModal(false);
//     setReason("")
//     setTimeout(() => {
//       setRfidCode("");
//       setLoading(false)
//       setStep(0);
//       setFormData({
//         petName :"",
//         Area: '',
//         PetCategory: '',
//         Supervisor: '',
//         Agent: '',
//         Height: '',
//         Weight: '',
//         Age: '',
//         Color: '',
//         BirthControl: 'Yes',
//         Gender: 'Male'
//       })
//       Toast.show({
//         type: "success",
//         text1: "Data Saved Successfully!",
//         visibilityTime: 1200,
//       });
//         setStep(0);
//     }, 2000);
//   };


  
//   return (
//     <>
//       {/* <Stack.Screen
//         options={{
//           title: 'Pet Registration',
//           headerTitleAlign: 'center',
//           headerStyle: { backgroundColor: '#007bff' },
//           headerTintColor: '#fff',
//           headerBackVisible: false,
//           headerRight: () => (
//             <TouchableOpacity onPress={() => router.push('/')} style={{ marginRight: 15 }}>
//               <Ionicons name="settings-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//           ),
//         }}
//       /> */}

//       <View style={styles.headerContainer}>
//         { step === 0 ? "" :<TouchableOpacity
//           style={[styles.settingsButton, { marginRight: 315 }]}
//           onPress={() => setStep(0)} // This will go to the previous screen
//           activeOpacity={0.7}
//         >
//           <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => [setRfidCode(""),setStep(0),setScanning(false)]}/>
//         </TouchableOpacity>}
//         <Text style={styles.headerTitle}>Admin Registration</Text>
//         <TouchableOpacity 
//           style={styles.settingsButton}
//           onPress={() => router.push('/')}
//           activeOpacity={0.7}
//         >
//           <Ionicons name="settings-outline" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
//         {Loading ? (
//           <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//             <ActivityIndicator size="large" color="Blue" />
//             <Text>Loading ...</Text>
//           </View>
//         ) : (
//           <>
//             {step === 0 && (
//               <>
//               <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                 <TouchableOpacity style={[styles.box, { flex: 1, marginRight: 5 }]} onPress={() => {setStep(1);}}>
//                   <Text style={styles.boxText}>Pet Registration</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.box, { flex: 1, marginLeft: 5 }]} onPress={DataSnapshot}>
//                   <Text style={styles.boxText}>Scan Pet</Text>
//                 </TouchableOpacity>
//               </View>
//               <View>
//                 <TouchableOpacity 
//                   style={[styles.actionButton, styles.registerButton]}
//                   // onPress={() => setStep(1)}
//                   // 
//                             onPress={() => router.push('/adminwelcome/clinicdata')}
//                 >
//                   <Ionicons name="paw" size={28} color="#fff" style={styles.buttonIcon} />
//                   <Text style={styles.actionButtonText}>All Clinic</Text>
//                   <Text style={styles.actionButtonSubtext}>Full Details Of The Pet From system</Text>
//                 </TouchableOpacity>

//               </View>
//               </>
//             )}
//             {step === 1 && (
//               // <View style={styles.centerView}>
//               //   <View style={styles.centerView}>
//               //     <Text style={styles.stepTitle}>Step 1: Scan RFID Tag</Text>
//               //     <View style={styles.scannerContainer}>
//               //       <View style={styles.scannerVisual}>
//               //         <Animated.View 
//               //           style={[
//               //             styles.scanLine,
//               //             { transform: [{ translateY: translateY }] }
//               //           ]} 
//               //         />
//               //         {rfidCode ? (
//               //           <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
//               //         ) : (
//               //           <Ionicons name="radio-outline" size={60} color="#007bff" />
//               //         )}
//               //       </View>
//               //       <View style={styles.controlsContainer}>
//               //         <TouchableOpacity 
//               //           style={[
//               //             styles.scanButton,
//               //             rfidCode && styles.scanButtonDisabled
//               //           ]} 
//               //           onPress={handleStartScan}
//               //           disabled={!!rfidCode}
//               //         >
//               //           <Text style={styles.scanButtonText}>
//               //             {rfidCode ? 'Tag Scanned' : 'Start Scanning'}
//               //           </Text>
//               //           {scanning && !rfidCode && (
//               //             <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
//               //           )}
//               //         </TouchableOpacity>
//               //         {scanning && (
//               //           <TextInput
//               //             ref={inputRef}
//               //             value={rfidCode}
//               //             onChangeText={handleInputChange}
//               //             style={styles.hiddenInput}
//               //             autoFocus
//               //             blurOnSubmit={false}
//               //           />
//               //         )}
//               //       </View>
//               //       <View style={styles.resultContainer}>
//               //         <Text style={styles.resultLabel}>RFID TAG NUMBER:</Text>
//               //         <Text style={styles.resultValue} numberOfLines={1} ellipsizeMode="middle">
//               //           {rfidCode || 'Not yet scanned'}
//               //         </Text>
                    
//               //       </View>
//               //     </View>
//               //   </View>
//               // </View>
//               <View style={styles.centerView}>
//   {/* Back Arrow */}
//   <TouchableOpacity style={styles.backButton} onPress={() => setStep(0)}>
//     <Ionicons name="arrow-back" size={24} color="#000" />
//     <Text style={styles.backText}>Back</Text>
//   </TouchableOpacity>

//   <Text style={styles.stepTitle}>Step 1: Scan RFID Tag</Text>

//   <View style={styles.scannerContainer}>
//     <View style={styles.scannerVisual}>
//       <Animated.View
//         style={[
//           styles.scanLine,
//           { transform: [{ translateY: translateY }] }
//         ]}
//       />
//       {rfidCode ? (
//         <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
//       ) : (
//         <Ionicons name="radio-outline" size={60} color="#007bff" />
//       )}
//     </View>

//     <View style={styles.controlsContainer}>
//       <TouchableOpacity
//         style={[
//           styles.scanButton,
//           rfidCode && styles.scanButtonDisabled
//         ]}
//         onPress={handleStartScan}
//         disabled={!!rfidCode}
//       >
//         <Text style={styles.scanButtonText}>
//           {rfidCode ? 'Tag Scanned' : 'Start Scanning'}
//         </Text>
//         {scanning && !rfidCode && (
//           <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
//         )}
//       </TouchableOpacity>

//       {scanning && (
//         <TextInput
//           ref={inputRef}
//           value={rfidCode}
//           onChangeText={handleInputChange}
//           style={styles.hiddenInput}
//           autoFocus
//           blurOnSubmit={false}
//         />
//       )}
//     </View>

//     <View style={styles.resultContainer}>
//       <Text style={styles.resultLabel}>RFID TAG NUMBER:</Text>
//       <Text style={styles.resultValue} numberOfLines={1} ellipsizeMode="middle">
//         {rfidCode || 'Not yet scanned'}
//       </Text>
//     </View>
//   </View>
// </View>
//             )}
//             {step === 2 && (
//               <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.formContainer}>
//                   <Text style={styles.formTitle}>{Register} Pet</Text>
//                   <View style={[styles.inputGroup,errors.petName && { borderColor: 'red', borderWidth: 1 }]}>
//                     <TextInput
//                       style={[styles.input, { color: '#000' }]}
//                       placeholder="Enter pet name"
//                       keyboardType="default"
//                       placeholderTextColor="#888"
//                       autoCapitalize="none"
//                       value={formData.petName}
//                       onChangeText={(e)=>{setFormData({...formData, petName:e});setErrors({ ...errors, petName: '' });}}
//                     />
//                   </View>
//                   <View style={styles.doubleInputGroup}>
//                     <View style={[styles.inputWrapper2,errors.Area && { borderColor: 'red', borderWidth: 1 }]}>
//                       <Picker
//                         selectedValue={formData.Area}
//                         style={[styles.picker, { color: formData.Area ? '#000' : '#888' }]}
//                         onValueChange={(itemValue) => {
//                           setFormData({ ...formData, Area: itemValue });
//                           setErrors({ ...errors, Area: '' });
//                         }}
//                       >
//                         <Picker.Item label="Select Area" value="" />
//                         <Picker.Item label="KK Nagar" value="KK Nagar" />
//                         <Picker.Item label="Sundar Street 1" value="Sundar Street 1" />
//                         <Picker.Item label="Sundar Street 2" value="Sundar Street 2" />
//                         <Picker.Item label="Railway Junction" value="Railway Junction" />
//                       </Picker>
//                     </View>
//                     <View style={[styles.inputWrapper2,errors.PetCategory && { borderColor: 'red', borderWidth: 1 }]}>
//                       <Picker
//                         selectedValue={formData.PetCategory}
//                         style={[styles.picker, { color: formData.PetCategory ? '#000' : '#888' }]}
//                         onValueChange={(itemValue) => {
//                           setFormData({ ...formData, PetCategory: itemValue });
//                           setErrors({ ...errors, PetCategory: '' });
//                         }}
//                       >
//                         <Picker.Item label="Select Category" value="" />
//                         <Picker.Item label="Street Dog" value="Street Dog" />
//                         <Picker.Item label="House Dog" value="House Dog" />
//                       </Picker>
//                     </View>
//                   </View>
//                   <View style={styles.doubleInputGroup}>
//                     <View style={[styles.inputWrapper2,errors.Supervisor && { borderColor: 'red', borderWidth: 1 }]}>
//                       <Picker
//                         selectedValue={formData.Supervisor}
//                         style={[styles.picker, { color: formData.Supervisor ? '#000' : '#888' }]}
//                         onValueChange={(itemValue) => {
//                           setFormData({ ...formData, Supervisor: itemValue });
//                           setErrors({ ...errors, Supervisor: '' });
//                         }}
//                       >
//                         <Picker.Item label="Select Supervisor" value=""  />
//                         <Picker.Item label="Supervisor 1" value="Supervisor 1" />
//                         <Picker.Item label="Supervisor 2" value="Supervisor 2" />
//                       </Picker>
//                     </View>
//                     <View style={[styles.inputWrapper2,errors.Agent && { borderColor: 'red', borderWidth: 1 }]}>
//                       <Picker
//                         selectedValue={formData.Agent}
//                         style={[styles.picker, { color: formData.Agent ? '#000' : '#888' }]}
//                         onValueChange={(itemValue) => {
//                           setFormData({ ...formData, Agent: itemValue });
//                           setErrors({ ...errors, Agent: '' });
//                         }}
//                       >
//                         <Picker.Item label="Select Agent" value=""  />
//                         <Picker.Item label="Agent 1" value="Agent 1" />
//                         <Picker.Item label="Agent 2" value="Agent 2" />
//                       </Picker>
//                     </View>
//                   </View>
//                   <View style={styles.doubleInputGroup}>
//                     <View style={[styles.inputWrapper,errors.Height && { borderColor: 'red', borderWidth: 1 }]}>
//                       <TextInput
//                         style={[styles.input, { color: '#000' }]}
//                         placeholder="Height (cm)"
//                         keyboardType="default"
//                         placeholderTextColor="#888"
//                         autoCapitalize="none"
//                         value={formData.Height}
//                         onChangeText={(e)=>{setFormData({...formData, Height:e});setErrors({ ...errors, Height: '' });}}
//                       />
//                     </View>
//                     <View style={[styles.inputWrapper,errors.Weight && { borderColor: 'red', borderWidth: 1 }]}>
//                       <TextInput
//                         style={[styles.input, { color: '#000' }]}
//                         placeholder="Weight (kg)"
//                         keyboardType="default"
//                         placeholderTextColor="#888"
//                         autoCapitalize="none"
//                         value={formData.Weight}
//                         onChangeText={(e)=>{setFormData({...formData, Weight:e});setErrors({ ...errors, Weight: '' });}}
//                       />
//                     </View>
//                   </View>
//                   <View style={styles.doubleInputGroup}>
//                       <View style={[styles.inputWrapper,errors.Age && { borderColor: 'red', borderWidth: 1 }]}>
//                         <TextInput
//                           style={[styles.input, { color: '#000' }]}
//                           placeholder="Age"
//                           keyboardType="default"
//                           placeholderTextColor="#888"
//                           autoCapitalize="none"
//                           value={formData.Age}
//                           onChangeText={(e)=>{setFormData({...formData, Age:e});setErrors({ ...errors, Age: '' });}}
//                         />
//                       </View>
//                       <View style={[styles.inputWrapper,errors.Color && { borderColor: 'red', borderWidth: 1 }]}>
//                         <TextInput
//                           style={[styles.input, { color: '#000' }]}
//                           placeholder="Color"
//                           keyboardType="default"
//                           placeholderTextColor="#888"
//                           autoCapitalize="none"
//                           value={formData.Color}
//                           onChangeText={(e)=>{setFormData({...formData, Color:e});setErrors({ ...errors, Color: '' });}}
//                         />
//                       </View>
//                   </View>
//                   <View style={styles.doubleInputGroup}>
//                     <View style={styles.inputWrapper}>
//                       <Text style={styles.label}>Birth Control</Text>
//                       <View style={styles.radioGroup}>
//                         {["Yes", "No"].map((option) => (
//                           <TouchableOpacity
//                             key={option}
//                             style={styles.radioButton}
//                             onPress={() => {
//                               setFormData({ ...formData, BirthControl: option }); // <-- use option here
//                               setErrors({ ...errors, BirthControl: '' }); // clear error
//                             }}
//                           >
//                             <View style={styles.radioOuter}>
//                               {formData.BirthControl === option && <View style={styles.radioInner} />}
//                             </View>
//                             <Text style={styles.radioLabel}>{option}</Text>
//                           </TouchableOpacity>
//                         ))}
//                       </View>
//                     </View>
//                     <View style={styles.inputWrapper}>
//                       <Text style={styles.label}>Gender</Text>
//                       <View style={styles.radioGroup}>
//                         {["Male", "Female"].map((option) => (
//                           <TouchableOpacity
//                             key={option}
//                             style={styles.radioButton}
//                             onPress={() => {
//                               setFormData({ ...formData, Gender: option });
//                               setErrors({ ...errors, Gender: '' });
//                             }}
//                           >
//                             <View style={styles.radioOuter}>
//                               {formData.Gender === option && <View style={styles.radioInner} />}
//                             </View>
//                             <Text style={styles.radioLabel}>{option}</Text>
//                           </TouchableOpacity>
//                         ))}
//                       </View>
//                     </View>
//                   </View>
//                   <TouchableOpacity style={styles.registerButton} onPress={handleSave}>
//                     <Text style={styles.registerButtonText}>{Register} Pet</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             )}
//             {step === 4 && (
//               <View style={styles.centerView}>
//                 <View style={styles.centerView}>
                
//   <TouchableOpacity style={styles.backButton} onPress={() => setStep(0)}>
//     <Ionicons name="arrow-back" size={24} color="#000" />
//     <Text style={styles.backText}>Back</Text>
//   </TouchableOpacity>
//                   <Text style={styles.stepTitle}>Step 4 : Scan RFID Tag To Get Data</Text>
//                   <View style={styles.scannerContainer}>
//                     <View style={styles.scannerVisual}>
//                       <Animated.View 
//                         style={[
//                           styles.scanLine,
//                           { transform: [{ translateY: translateY }] }
//                         ]} 
//                       />
//                       {rfidCodegetData ? (
//                         <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
//                       ) : (
//                         <Ionicons name="radio-outline" size={60} color="#007bff" />
//                       )}
//                     </View>
//                     <View style={styles.controlsContainer}>
//                       <TouchableOpacity 
//                         style={[
//                           styles.scanButton,
//                           rfidCodegetData && styles.scanButtonDisabled
//                         ]} 
//                         onPress={handleStartScaning}
//                         disabled={!!rfidCodegetData}
//                       >
//                         <Text style={styles.scanButtonText}>
//                           {rfidCodegetData ? 'Tag Scanned' : 'Start Scanning'}
//                         </Text>
//                         {scanning && !rfidCodegetData && (
//                           <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
//                         )}
//                       </TouchableOpacity>
//                       {scanning && (
//                         <TextInput
//                           ref={inputRef}
//                           value={rfidCodegetData}
//                           onChangeText={handleInputChanging}
//                           style={styles.hiddenInput}
//                           autoFocus
//                           blurOnSubmit={false}
//                         />
//                       )}
//                     </View>
//                     <View style={styles.resultContainer}>
//                       <Text style={styles.resultLabel}>RFID TAG NUMBER:</Text>
//                       <Text style={styles.resultValue} numberOfLines={1} ellipsizeMode="middle">
//                         {rfidCodegetData || 'Not yet scanned'}
//                       </Text>
                    
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}
//           </>
//         )}
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalBackground}>
//             <View style={styles.modalContainer}>
//               <TouchableOpacity
//                 style={styles.closeIcon}
//                 onPress={() => {
//                   setModalVisible(false);
//                   setStep(4);
//                   setrfidCodegetData("");
//           }}
//               >
//                 <MaterialIcons name="close" size={28} color="black" />
//               </TouchableOpacity>

//               <ScrollView>
//                 <Text style={styles.title}>Pet Information</Text>

//                 {petData &&
//                   Object.keys(petData)
//                     .filter(
//                       (key) =>
//                         key !== "createdAt" &&
//                         key !== "id" &&
//                         key !== "updatedAt" 
//                     )
//                     .map((key) => (
//                       <View style={styles.row} key={key}>
//                         <Text style={styles.keyText}>{key} </Text>
//                         <Text style={styles.valueText}> : {String(petData[key])}</Text>
//                       </View>
//                     ))
//                 }
//                 <View style={styles.actionRow}>
//                   <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
//                     <MaterialIcons name="edit" size={20} color="#fff" />
//                     <Text style={styles.buttonText}>Edit</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           transparent
//           visible={popupVisible}
//           animationType="fade"
//           onRequestClose={() => setPopupVisible(false)}
//         >
//           <View style={styles.overlay}>
//             <View style={styles.popup}>
//               <Text style={styles.title}>Edit Data?</Text>
//               <Text style={styles.message}>Do you want to edit this  details?</Text>
//               <View style={styles.buttonRow2}>
//                 <TouchableOpacity style={styles.noButton} onPress={handleNo}>
//                   <Text style={styles.buttonText}>No</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
//                   <Text style={styles.buttonText}>Yes</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         {/* <Modal visible={showModal} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.warningTitle}>⚠ Warning</Text>
//               <Text style={styles.warningText}>
//                 This dog has not had birth control. Please provide a reason before proceeding.
//               </Text>

//               <TextInput
//                 placeholder="Enter reason..."
//                 value={reason}
//                 onChangeText={setReason}
//                 style={styles.input}
//                 multiline
//               />

//               <View style={styles.modalActions}>
//                 <TouchableOpacity
//                   style={[styles.modalBtn, { backgroundColor: "#4CAF50" }]}
//                   onPress={handleConfirm}
//                 >
//                   <Text style={styles.btnText}>Yes, Proceed</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalBtn, { backgroundColor: "#F44336" }]}
//                   onPress={() => {
//                     setShowModal(false);
//                     setStep(2);
//                   }}
//                 >
//                   <Text style={styles.btnText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal> */}
//         {/* <Modal visible={showModal} transparent animationType="fade">
//   <View style={styles.modalOverlay}>
//     <View style={styles.modalContent}> */}
//       {/* Warning Header */}
//       {/* <View style={styles.header}>
//         <Text style={styles.warningIcon}>⚠</Text>
//         <Text style={styles.warningTitle}>Birth Control Not Done</Text>
//       </View>

//       {/* Description */}
//       {/* <Text style={styles.warningText}>
//         This dog has not had birth control. Please provide a reason before proceeding.
//       </Text> */} 

//       {/* Input */}
//       {/* <TextInput
//         placeholder="Enter reason..."
//         value={reason}
//         onChangeText={setReason}
//         style={styles.input}
//         multiline
//         placeholderTextColor="#888"
//       /> */}

//       {/* Buttons */}
//       {/* <View style={styles.modalActions}>
//         <TouchableOpacity
//           style={[styles.modalBtn, styles.confirmBtn]}
//           onPress={handleConfirm}
//         >
//           <Text style={styles.btnText}>Yes, Proceed</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.modalBtn, styles.cancelBtn]}
//           onPress={() => {
//             setShowModal(false);
//             setStep(2);
//           }}
//         >
//           <Text style={styles.btnText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// </Modal> */}

// <Modal visible={showModal} transparent animationType="fade">
//   <View style={styles.modalOverlay}>
//     <View style={styles.modalContent}>
//       {/* Warning Icon */}
//       <View style={styles.iconWrapper}>
//         <Text style={styles.warningIcon}>⚠️</Text>
//       </View>

//       {/* Title */}
//       <Text style={styles.warningTitle}>Birth Control Not Done</Text>

//       {/* Description */}
//       <Text style={styles.warningText}>
//         This dog has not had birth control. Please provide a reason before proceeding.
//       </Text>

//       {/* Input */}
//       <View style={[styles.input,errors.reason && { borderColor: 'red', borderWidth: 1 }]}>
//       <TextInput
//         placeholder="Enter reason..."
//         value={reason}
//         onChangeText={setReason}
//         multiline
//         placeholderTextColor="#888"
//       />

//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={[styles.button, styles.confirmBtn]} onPress={handleConfirm}>
//           <Text style={styles.btnText}>Yes, Proceed</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => [setShowModal(false),setLoading(false)]}>
//           <Text style={styles.btnText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// </Modal>


//       </View>
//       <Toast />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   box           :{backgroundColor: "#007bff",padding: 20,borderRadius: 10,alignItems: "center",marginVertical: 20,},
//   boxText       :{color: "#fff",fontSize: 18,fontWeight: "bold",},
//   centerView    :{flex: 1,justifyContent: "center",alignItems: "center"},
//   stepTitle     :{fontSize: 20,fontWeight: "bold",padding:30},
//   cardContainer :{width: 200,height: 250,backgroundColor: "#eee",borderRadius: 10,overflow: "hidden",justifyContent: "center",alignItems: "center",position: "relative",marginBottom: 20,},

//   cardImage        :{width: "100%",height: "100%",resizeMode: "cover",},
//   scanLine         :{position: "absolute",top: 0,width: "100%",height: 4,backgroundColor: "red",opacity: 0.8,},
//   saveButton       :{backgroundColor: "blue",padding: 12,borderRadius: 8,marginTop: 15},
//   container        :{ flex: 1, justifyContent: "center", alignItems: "center" },
//   title            :{ fontSize: 25, marginBottom: 20,fontFamily: "sans-serif", },
//   result           :{ marginTop: 20, fontSize: 16 },  
//   scannerContainer : {width: '100%',alignItems: 'center',marginTop: 20},
//   scannerVisual    : {width: 200,height: 200,borderRadius: 20,backgroundColor: '#f5f5f5',borderWidth: 2,borderColor: '#e0e0e0',justifyContent: 'center',alignItems: 'center',overflow: 'hidden',marginBottom: 30,position: 'relative',},

//   successIcon       :{backgroundColor: 'rgba(255,255,255,0.9)',borderRadius: 30,},
//   controlsContainer :{width: '100%',alignItems: 'center',},
//   scanButton        : {backgroundColor: '#007bff',paddingVertical: 15,paddingHorizontal: 30,borderRadius: 30,width: '80%',elevation: 3,shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2,shadowRadius: 3,display:"flex",justifyContent:"space-evenly"},
  
//   scanButtonDisabled :{backgroundColor: '#4CAF50',},
//   scanButtonText     :{color: 'white',fontWeight: 'bold',fontSize: 16,},
//   loadingIndicator   :{marginLeft: 10,},
//   resultContainer    :{marginTop: 30,width: '100%',alignItems: 'center',},
//   resultLabel        :{color: '#666',fontSize: 14,marginBottom: 5},
//   resultValue        :{backgroundColor: '#f5f5f5',padding: 12,borderRadius: 8, borderWidth: 1,borderColor: '#e0e0e0',width: '80%',textAlign: 'center',fontSize: 16,fontWeight: 'bold',color: '#333',},
  
//   clearButton      : {marginTop: 15,padding: 8},
//   clearButtonText  : {color: '#ff4444',fontWeight: 'bold'},
//   hiddenInput      : {position: 'absolute',opacity: 0,height: 0,width: 0,}, 
//   scrollContainer  : {flexGrow: 1,paddingBottom: 30,},
//   formContainer    : {padding: 20,},
//   formTitle        : {fontSize: 22,fontWeight: 'bold',marginBottom: 25,textAlign: 'center',color: '#333',},
//   readonlyField    : {backgroundColor: '#f8f9fa',padding: 15,borderRadius: 10,marginBottom: 20,borderWidth: 1,borderColor: '#e9ecef',},
//   readonlyLabel    : {fontSize: 12,color: '#6c757d',marginBottom: 4},
//   readonlyValue    : {fontSize: 16,fontWeight: '600',color: '#212529',},
//   inputGroup       : {marginBottom: 20,},
//   doubleInputGroup : {flexDirection: 'row',justifyContent: 'space-between',marginBottom: 20,},
//   inputWrapper     : {width: '48%',height: 50,},
//   label            : {fontSize: 14,color: '#495057',marginBottom: 8,fontWeight: '500',},
//   input            : {borderWidth: 1,borderColor: '#ced4da',borderRadius: 8,padding: 12,backgroundColor: '#fff',fontSize: 15,},
//   dropdown         : {borderWidth: 1,borderColor: '#ced4da',borderRadius: 8,padding: 12,backgroundColor: '#fff',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',},
  
//   dropdownText : {color: '#212529',fontSize: 15,},
//   radioGroup   : {flexDirection: 'row',alignItems: 'center',marginTop: 5,},
//   radioButton  : {flexDirection: 'row',alignItems: 'center',marginRight: 20,},
//   radioOuter   : {height: 20,width: 20,borderRadius: 10,borderWidth: 2,borderColor: '#007bff',alignItems: 'center',justifyContent: 'center',marginRight: 8,},
//   radioInner   : {height: 10,width: 10,borderRadius: 5,backgroundColor: '#007bff',},

//   radioInnerUnselected : {backgroundColor: 'transparent',},
//   radioLabel           : {color: '#212529',fontSize: 14,},
//   registerButton       : {backgroundColor: '#28a745',padding: 16,borderRadius: 8,alignItems: 'center',marginTop: 10,elevation: 2,shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 4,},

//   registerButtonText : {color: '#fff',fontWeight: 'bold',fontSize: 16,},
//   picker             : {height: 50,justifyContent: 'center',top:-1,},
//   inputWrapper2      : {width:"48%",justifyContent: 'center',borderWidth: 1,borderColor: '#ddd',borderRadius: 8,height: 50,paddingHorizontal: 10,backgroundColor: '#fff',marginBottom: 12,}, 

//   modalBackground : {flex: 1,backgroundColor: "rgba(0,0,0,0.5)",justifyContent: "center",alignItems: "center",},
//   field           : {fontSize: 16,marginVertical: 5,},
//   iconRow         : {flexDirection: "row",justifyContent: "center",marginTop: 20,},
//   iconButton      : {marginHorizontal: 15,},
//   row             : {flexDirection: "row",marginVertical: 5},
//   keyText         : {fontWeight: "bold",fontSize: 18,color: "black",fontFamily: "sans-serif",width: 180,},
//   modalContainer  : {width: "90%",backgroundColor: "#fff",borderRadius: 10,padding: 20,maxHeight: "80%",},
//   closeIcon       : {position: "absolute",top: 10,right: 10,zIndex: 1,padding: 5,},
//   valueText       : {fontSize: 18,color: "black",flexShrink: 1,},
//   actionRow       : {flexDirection: "row",justifyContent: "space-around",marginTop: 20,},
//   editButton      : {flexDirection: "row",alignItems: "center",backgroundColor: "orange",paddingVertical: 8,paddingHorizontal: 15,borderRadius: 5,},
//   deleteButton    : {flexDirection: "row",alignItems: "center",backgroundColor: "red",paddingVertical: 8,paddingHorizontal: 15,borderRadius: 5,},
//   buttonText      : {color: "#fff",fontSize: 16,marginLeft: 5,},
//   editText        : { color: "#fff", fontSize: 16 },
//   overlay         : {flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: "rgba(0,0,0,0.5)"},
//   popup           : {backgroundColor: "#fff",padding: 20,borderRadius: 10,width: 300,alignItems: "center"},
//   message         : { fontSize: 14, textAlign: "center", marginBottom: 20 },
//   buttonRow2      : { flexDirection: "row", justifyContent: "space-between", width: "80%" },
//   yesButton       : {backgroundColor: "green",paddingVertical: 8,paddingHorizontal: 20,borderRadius: 5},
//   noButton        : {backgroundColor: "red",paddingVertical: 8,paddingHorizontal: 20,borderRadius: 5},
//   saveBtn: {
//     backgroundColor: "#3f51b5",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   saveText: { color: "#fff", fontWeight: "bold" },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 8,
//     width: "80%",
//     alignItems: "center",
//   },
//   warningTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   warningText: { fontSize: 14, textAlign: "center", marginBottom: 20 },
//   modalActions: { flexDirection: "row", gap: 10 },
//   modalBtn: {
//     padding: 10,
//     borderRadius: 5,
//     minWidth: 100,
//     alignItems: "center",
//   },
//   btnText: { color: "#fff", fontWeight: "bold" },
  
// header: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 10,
// },
// warningIcon: {
//   fontSize: 28,
//   marginRight: 8,
// },
// confirmBtn: {
//   backgroundColor: "#4CAF50",
// },
// cancelBtn: {
//   backgroundColor: "#F44336",
// },
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
//     marginBottom: 10,
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
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 50,
//     width: '100%',
//     textAlignVertical: 'top',
//     backgroundColor: '#f9f9f9',
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
//   },backButton: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// backText: {
//   fontSize: 16,
//   marginLeft: 5,
// },
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
//   buttonIcon: {
//     marginBottom: 15,
//   },
// });
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar ,ActivityIndicator,TextInput,Image,Platform,Modal,KeyboardAvoidingView  } from "react-native";
import { Ionicons ,MaterialIcons} from '@expo/vector-icons';
import { router , useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Toast, { BaseToast } from 'react-native-toast-message';
import * as Location from "expo-location";
import { addDoc, collection , getDocs, query, where,  doc, updateDoc , getDoc , setDoc} from 'firebase/firestore';
import {valuedb} from '../../src/firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function IndexPage() {
  const [step, setStep]                       = useState(0)
  const [openArea, setOpenArea]               = useState(false);
  const [openCity, setOpenCity]               = useState(false);
  const [openCategory, setOpenCategory]       = useState(false);
  const [Loading, setLoading]                 = useState(false);
  const [LoadingData, setLoadingData]         = useState(false);
  const [rfidCode, setRfidCode]               = React.useState('');
  const [scanning, setScanning]               = React.useState(false);
  const [Register, SetRegister]               = useState('Submit');
  const [modalVisible, setModalVisible]       = useState(false);
  const [showModal, setShowModal]             = useState(false);
  const [email, setEmail]                     = useState(useLocalSearchParams());
  const [reason, setReason]                   = useState("");
  const [UserData, setUserData]               = useState([]);
  const [petData, setPetData]                 = useState({
    Picture : "",
    PetName :"",
    Area: '',
    City: '',
    PetCategory: '',
    Height: '',
    Weight: '',
    Age: '',
    Color: '',
    BirthControl: 'Yes',
    Gender: 'Female'
  });
  const [rfidCodegetData, setrfidCodegetData] = useState("");
  const [Address, setAddress]                 = useState("");
  const [areaItems, setAreaItems]             = useState([]);
  const [cityItems, setCityItems]             = useState([{}]);
  const [categoryItems, setCategoryItems] = useState([
    { label: 'House Dog', value: 'House Dog' },
    { label: 'Street Dog', value: 'Street Dog' },
  ]);
  const [formData , setFormData] = useState({
    Picture : "",
    PetName :"",
    Area: '',
    City: '',
    PetCategory: '',
    Height: '',
    Weight: '',
    Age: '',
    Color: '',
    BirthControl: 'Yes',
    Gender: 'Female'
  })
  const [Error , Formerror] = useState({
    Picture : "",
    PetName :"",
    Area: '',
    City: '',
    PetCategory: '',
    Height: '',
    Weight: '',
    Age: '',
    Color: '',
    BirthControl: '',
    Gender: '',
    reason:""
  })

  useEffect(() => {
    if (!email) return;
    const fetchData = async () => {
      try {
        const q = query(
          collection(valuedb, "DistrictAndArea"),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const documents = querySnapshot.docs.map(doc => ({
            // id: doc.id,
            ...doc.data()
          }));
          setUserData(documents);
        } else {
          console.log("No documents found with this email");
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);


  const inputRef = React.useRef(null);


  const getAddressFromCoords = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village || "";
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  };

  // Scan start handler
  const handleStartScan = async() => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //   return;
    // }
    // let loc = await Location.getCurrentPositionAsync({
    //   accuracy: Location.Accuracy.Highest
    // });

    // let address = await getAddressFromCoords(
    //   loc.coords.latitude,
    //   loc.coords.longitude
    // );
    
    setScanning(false);
    inputRef.current?.focus();
    setLoading(false)
    setStep(3);
    console.log(UserData)
    try {
      const cityNames = UserData.map(obj => Object.keys(obj));
      let cityOptions = cityNames.map(item => ({
        label: item[0],
        value: item[0]
      }));
      setCityItems(cityOptions)
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleStartScaning = () => {
    setScanning(true);
    setTimeout(() => {
    setStep(6);
      inputRef.current?.focus();
    }, 1000);
  };

  // Input change handler - reader usually sends code automatically as input
  const handleInputChange = async(event) => {
    setRfidCode("0003826505");
    if (event.length >= 8) {
      setScanning(false);
      setLoading(true);
      try {
        const q = query(collection(valuedb, "DogFullDataBase"), where("RfidCode", "==", "0003826505"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setRfidCode("");
          Toast.show({
            type: 'error',
            text1: '⚠ RFID Already Exists!',
            text2: 'Give New RFID Number.',
            visibilityTime: 1200,
          });
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setStep(2);
          setLoading(false);
        }, 1000);

      }catch(error){
        Toast.show({
          type: 'error',
          text1: '⚠ Error checking RFID!',
          text2: 'Checking RFID Number !!!!!!!.',
          visibilityTime: 1200,
        });
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required to take photos');
      return;
    }
    if (Platform.OS === 'web') {
    var result 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          setFormData(prev => ({
            ...prev,
            Picture: readerEvent.target.result
          }));
          Formerror(prev => ({
            ...prev,
            Picture: ""
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  } else {
    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(!result.canceled){
      setFormData({
        ...formData,
        Picture: result.assets[0].uri // Update only the Picture field
      });
    }
  }
  };

    
  const toastConfig = {
    success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#28a745',
        backgroundColor: '#eaffea',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745'
      }}
      text2Style={{
        fontSize: 14,
        color: '#155724'
      }}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={28} color="#28a745" style={{ marginLeft: 10 }} />
      )}
    />
  ),

    error: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#FF3B30',
          backgroundColor: '#ffeaea',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 4,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FF3B30'
        }}
        text2Style={{
          fontSize: 14,
          color: '#721c24'
        }}
        renderLeadingIcon={() => (
          <Ionicons name="close-circle" size={28} color="#FF3B30" style={{ marginLeft: 10 }} />
        )}
      />
    ),

    warning: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#ffc107',
          backgroundColor: '#fff8e1',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 4,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#856404'
        }}
        text2Style={{
          fontSize: 14,
          color: '#856404'
        }}
        renderLeadingIcon={() => (
          <Ionicons name="warning" size={28} color="#ffc107" style={{ marginLeft: 10 }} />
        )}
      />
    ),
  };


  const validateFields = () => {
    let tempErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
      Toast.show({
        type: 'error',
        text1: '⚠ Required Fields Missing!',
        text2: 'Please fill all mandatory fields before submitting.',
        visibilityTime: 1200,
      });
        tempErrors[key] = `${key} is required`;
        isValid = false;
      }
    });
    Formerror(prev => ({ ...prev, ...tempErrors }));
    return isValid;
  };
  
  // Form submission
  const handleSubmit = async() => {
    if (!validateFields()) return;
    try {
      if(Register === "Submit"){
        setLoadingData(true)
        if(formData.BirthControl === "Yes"){
          const employeeRefs = collection(valuedb,"DogFullDataBase")
          await addDoc(employeeRefs,{
            ...formData,RfidCode : '0003832937',Address : Address,
            createdAt: new Date().toISOString()
          })
          // console.log(formData)
          setTimeout(() => {
            Toast.show({
              type: 'success',
              text1: `✅ Pet Data Saved successfully!`,
              text2: 'Pet Data Stored In Database',
              visibilityTime: 1200,
            });
            setRfidCode("");
              setLoadingData(false)
            setStep(0);
            setFormData({
              PetName :"",
              Area: '',
              City: '',
              PetCategory: '',
              Height: '',
              Weight: '',
              Age: '',
              Color: '',
              BirthControl: 'Yes',
              Gender: 'Male',
              Picture :"",
            })
          }, 2000);
        }else{
          setShowModal(true);
          setLoading(false)
        }
      }else{
        setLoadingData(true)
        if(formData.BirthControl === "Yes"){
          try {
            const employeeref = collection(valuedb, "DogFullDataBase");
            const q = query(employeeref, where("RfidCode", "==", petData.RfidCode));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
              const docId = snapshot.docs[0].id;
              const petDocRef = doc(valuedb, "DogFullDataBase", docId);
              await updateDoc(petDocRef, {
                ...formData,
                updatedAt: new Date().toISOString()
              });
              setTimeout(() => {
              }, 2000);
              setrfidCodegetData("")
            } else {
              Toast.show({
                type: 'warning',
                text1: `No record found for this RFID Code.`,
                visibilityTime: 1200,
              });
            }
            setTimeout(() => {
              setRfidCode("");
              setLoadingData(false)
              setStep(0);
                Toast.show({
                  type: 'success',
                  text1: '✅ Pet data updated successfully!',
                  text2: 'Pet Data Stored In Database',
                  visibilityTime: 1200,
                });
              setFormData({
                PetName :"",
                Area: '',
                City: '',
                PetCategory: '',
                Height: '',
                Weight: '',
                Age: '',
                Color: '',
                BirthControl: 'Yes',
                Gender: 'Male',
                Picture:""
              })  
            SetRegister("Submit");
            }, 2000);
          } catch (error) {
            console.error("❌ Error updating pet data:", error);
          }
        }else{
          setLoading(false)
          setShowModal(true);
        }
      }
    }catch (error){
      console.error("Error adding data: ", error); 
    }
  };

  const handleChange = (e) => {
    // setScanning(true);
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 200);
  };

  
  const handleConfirm = async () => {
    if (!reason.trim()) {
      console.log(reason)
      let tempErrors = {};
      tempErrors["reason"] = `Reason is required`;
      Formerror(tempErrors);
    }
      setLoading(true)

    // Save to Firestore with reason
    const employeeRefs = collection(valuedb, "DogFullDataBase");
    await addDoc(employeeRefs, {
      ...formData,
      RfidCode: "0003832937",
      BirthControlReason: reason, // save reason here
      createdAt: new Date().toISOString(),
    });
    setShowModal(false);
    setReason("")
    setTimeout(() => {
      setRfidCode("");
      setLoading(false)
      setStep(0);
              setFormData({
                PetName :"",
                Area: '',
                City: '',
                PetCategory: '',
                Height: '',
                Weight: '',
                Age: '',
                Color: '',
                BirthControl: 'Yes',
                Gender: 'Male',
                Picture:""
              })
      Toast.show({
        type: "success",
        text1: "✅ Pet Data Saved successfully!",
        text2: 'Pet Data Stored In Database',
        visibilityTime: 1200,
      });
        setStep(0);
    }, 2000);
  };

  useEffect(() => {
    if (step === 6) {
      setLoading(true);
      const employeeref = collection(valuedb, "DogFullDataBase");
      const q = query(employeeref, where("RfidCode", "==", "0003832937"));
      getDocs(q)
        .then((snapshot) => {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });
          setTimeout(() => {
            if (result.length > 0) {
              setPetData(result[0]);
              setModalVisible(true);
            } else {
              setLoading(false)
              setrfidCodegetData("");
              Toast.show({
                type: 'error',
                text1: '⚠ There Is No Record To Display!',
                visibilityTime: 1200,
              });
            }
            setLoading(false);
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
        });
      }
    },[step]);

    const handleUpdate = () =>{
      console.log(petData)

      setFormData(prevFormData => {
        const updated = { ...prevFormData };
        Object.keys(updated).forEach(key => {
          if (petData[key] !== undefined) {
            updated[key] = petData[key];
          }
        });
        return updated;
      });
      Formerror({ ...Error, PetName: '',Picture:"",Age:"",Area:"",PetCategory:"",Height:"",Weight:"",Color:"",City:"" })
       if (petData?.Area) {
        // setAreaItems([{ label: petData.Area, value: petData.Area }]);
        // setCityItems([{ label: petData.City, value: petData.City }]);
      }
      setStep(3);
      SetRegister("Update");
      setModalVisible(false);
      setScanning(false);
    }

    const handleCityChange = (selectedCity) => {
      setFormData(prev => ({
        ...prev,
        City: selectedCity,
        Area: ""
      }));
      Formerror({ ...Error, City: "" });
      const cityObj = UserData.find(obj => Object.keys(obj)[0] === selectedCity);
      if (cityObj) {
        const areas = cityObj[selectedCity].map(area => ({
          label: area,
          value: area
        }));
        setAreaItems(areas); 
      }
    };

    const myCustomFunction = async(area) => {
      console.log("Function call from Area change:", area);
      try {
        const q = query(
          collection(valuedb, "cityandcentres"),
          where("area", "==", area)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const documents = querySnapshot.docs.map(doc => ({
            ...doc.data()
          }));
          console.log(documents[0].Address)
          setAddress(documents[0].Address)
        } else {
          console.log("No documents found with this area");
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
      } 
    };





  return (
  <>
    {Loading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#007bff" }}>Loading ...</Text>
      </View>
    ) : (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      <View style={styles.headerContainer}>
        { step === 0 || Register === "Update"? "" :
          <TouchableOpacity
            style={[styles.settingsButton, { marginRight: 315 }]}
            onPress={() => setStep(0)} // This will go to the previous screen
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => [setRfidCode(""),setStep(0),setScanning(false)]}/>
          </TouchableOpacity>}
          <Text style={styles.headerTitle}>Admin Registration</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
      </View>
      { step === 0 ? 
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>

            <View style={styles.actionsContainer}>

              <TouchableOpacity 
                style={[styles.actionButton, styles.registerButton]}
                onPress={() => [setStep(1),Formerror({ ...Error, PetName: '',Picture:"",Age:"",Area:"",PetCategory:"",Height:"",Weight:"",Color:"",City:"" })]}
              >
                <Ionicons name="paw" size={28} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>Register Pet</Text>
                <Text style={styles.actionButtonSubtext}>Add new pet to system</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.scanButton]}
                onPress={() => setStep(2)}
              >
                <Ionicons name="scan" size={28} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>Scan Pet</Text>
                <Text style={styles.actionButtonSubtext}>Find existing pet record</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.registerButton, { backgroundColor: '#ff9800' }]}
                onPress={() => router.push('/adminwelcome/clinicdata')}
              >
                <Ionicons name="shield-checkmark-outline" size={28} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>All Clinic</Text>
                <Text style={styles.actionButtonSubtext}>
                  Full Details Of The Pet From System
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.registerButton, { backgroundColor: '#baad9b' }]}
                // onPress={() => router.push('/adminwelcome/clinicdata')}
                onPress={checkCities}
              >
                <Ionicons name="add-outline" size={28} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>Add Mail ID And Password For Area</Text>
                
              </TouchableOpacity>


            </View>

          </ScrollView>
        </View>
      :""}        
      {step === 3 ?    
        <View style={{ flex: 1 }}>
          {LoadingData ? (
              <View style={styles.centerLoading}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Data Submitting ...</Text>
              </View>
            ) : (
                // <>
                  // <StatusBar barStyle="light-content" backgroundColor="#007bff"/>
        //           <View style={{ flex: 1 }}> 
        //           <KeyboardAvoidingView
        //             style={{ flex: 1 }}
        //             behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS → padding, Android → height
        //             keyboardVerticalOffset={80} // Header height irundha adjust pannunga
        //           >
        //             <KeyboardAwareScrollView
        //         style={{ flex: 1, backgroundColor: "#f5f7fa" }}
        //         contentContainerStyle={{ padding: 20 }}
        //         enableOnAndroid={true}
        //         extraScrollHeight={100} // keyboard open aana appo extra scroll
        //         keyboardShouldPersistTaps="handled"
        //       >
        //   <View style={styles.Imagecontainer}>
        //     <Text style={styles.header}>Register Pet</Text>
        //     <TouchableOpacity 
        //       style={[styles.imagePicker , Error.Picture && { borderColor: 'red', borderWidth: 1 }]}
        //       onPress={takePhoto}
        //        activeOpacity={0.8}
        //     >
        //       {formData.Picture ? (
        //         <Image 
        //           source={{ uri: formData.Picture }} 
        //           style={styles.petImage} 
        //         />
        //       ) : (
        //         <>
        //           <Ionicons name="camera" size={40} color="#888" />
        //           <Text style={styles.uploadText}>Take Pet Picture</Text>
        //         </>
        //       )}
        //     </TouchableOpacity>
        //   </View>
        //   {/* Pet Name */}
        //   <Text style={styles.label}>Pet Name</Text>
        //     <View >
        //       <TextInput 
        //         style={[styles.input, { color: '#000' },Error.PetName && { borderColor: 'red', borderWidth: 1 }]} 
        //         placeholder="Enter pet name" 
        //         keyboardType="default"
        //         placeholderTextColor="#888"
        //         autoCapitalize="none"
        //         value={formData.PetName}
        //         onChangeText={(e)=>{setFormData({...formData, PetName:e});Formerror({ ...Error, PetName: '' });}}
        //       />
        //     </View>
        //     <View style={{ height: 85, zIndex: 3 ,}}>
        //       <Text style={styles.label}>City</Text>
        //       <DropDownPicker
        //         open={openCity}
        //         value={formData.City}
        //         items={cityItems}
        //         setOpen={setOpenCity}
        //         // setValue={(callback) => {
        //         //   setFormData(prev => ({
        //         //     ...prev,
        //         //     City: callback(prev.City)
        //         //   }));
        //         //   Formerror({ ...Error, City: '' });
        //         // }}
        //         setValue={(callback) => {
        //           const newCity = callback(formData.City);
        //           handleCityChange(newCity);   // 🔹 function call
        //         }}
        //         setItems={setCityItems}
        //         placeholder="Select City"
        //         style={[{ borderColor: '#ccc',minHeight: 40} ,Error.City && { borderColor: 'red', borderWidth: 1 }]}
        //         dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
        //         listItemContainerStyle={{height: 40 }}
        //       />
        //     </View>
        //     <View style={{ height: 85, zIndex: 2 ,}}>
        //       <Text style={styles.label}>Area</Text>
        //       <DropDownPicker
        //         open={openArea}
        //         value={formData.Area}
        //         items={areaItems}
        //         setOpen={setOpenArea}
        //         setValue={(callback) => {
        //           const newValue = callback(formData.Area);   // 🔹 selected Area value
        //           setFormData(prev => ({
        //             ...prev,
        //             Area: newValue
        //           }));
        //           Formerror({ ...Error, Area: '' });

        //           // 🔹 Function call here
        //           myCustomFunction(newValue);
        //         }}

        //         // setValue={(callback) => {
        //         //   setFormData(prev => ({
        //         //     ...prev,
        //         //     Area: callback(prev.Area)
        //         //   }));
        //         //   Formerror({ ...Error, Area: '' });
        //         // }}
        //         setItems={setAreaItems}
        //         placeholder="Select Area"
        //         style={[{ borderColor: '#ccc',minHeight: 40} ,Error.Area && { borderColor: 'red', borderWidth: 1 }]}
        //         dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
        //         listItemContainerStyle={{height: 40 }}
        //       />
        //     </View>
        //     <View style={{ height: 85, zIndex: 1 }}>
        //       <Text style={styles.label}>Category</Text>
        //       <DropDownPicker
        //         open={openCategory}
        //         value={formData.PetCategory}
        //         items={categoryItems}
        //         setOpen={setOpenCategory}
        //         setValue={(callback) => {
        //           setFormData(prev => ({
        //             ...prev,
        //             PetCategory: callback(prev.PetCategory)
        //           }));
        //           Formerror({ ...Error, PetCategory: '' });
        //         }}
        //         setItems={setCategoryItems}
        //         placeholder="Select Category"
        //         style={[{ borderColor: '#ccc',minHeight: 40},Error.PetCategory && { borderColor: 'red', borderWidth: 1 }]}
        //         dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
        //         listItemContainerStyle={{height: 40 }}
        //       />
        //     </View>
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        //       <View style={{ flex: 1, marginRight: 10 }}>
        //         <Text style={styles.label}>Height (cm)</Text>
        //         <View>
        //           <TextInput 
        //             style={[styles.input, { color: '#000' },Error.Height && { borderColor: 'red', borderWidth: 1 }]} 
        //             placeholder="Enter Height (cm)" 
        //             keyboardType="numeric"
        //             placeholderTextColor="#888"
        //             autoCapitalize="none"
        //             value={formData.Height}
        //             onChangeText={(e)=>{setFormData({...formData, Height:e});Formerror({ ...Error, Height: '' });}}
        //           />
        //         </View>
        //       </View>
        //       <View style={{ flex: 1 }}>
        //         <Text style={styles.label}>Weight (kg)</Text>
        //         <View>
        //           <TextInput 
        //             style={[styles.input, { color: '#000' },Error.Weight && { borderColor: 'red', borderWidth: 1 }]} 
        //             placeholder="Enter Weight (kg)" 
        //             keyboardType="numeric"
        //             placeholderTextColor="#888"
        //             autoCapitalize="none"
        //             value={formData.Weight}
        //             onChangeText={(e)=>{setFormData({...formData, Weight:e});Formerror({ ...Error, Weight: '' });}}
        //           />
        //         </View>
        //       </View>
        //     </View>
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        //       <View style={{ flex: 1, marginRight: 10 }}>
        //         <Text style={styles.label}>Age (years)</Text>
        //         <View>
        //           <TextInput 
        //             style={[styles.input, { color: '#000' },Error.Age && { borderColor: 'red', borderWidth: 1 }]} 
        //             placeholder="Enter age" 
        //             keyboardType="numeric"
        //             placeholderTextColor="#888"
        //             autoCapitalize="none"
        //             value={formData.Age}
        //             onChangeText={(e)=>{setFormData({...formData, Age:e});Formerror({ ...Error, Age: '' });}}
        //           />
        //         </View>
        //       </View>
        //       <View style={{ flex: 1 }}>
        //         <Text style={styles.label}>Color</Text>
        //         <View>
        //           <TextInput 
        //             style={[styles.input, { color: '#000' },Error.Color && { borderColor: 'red', borderWidth: 1 }]} 
        //             placeholder="Enter Color" 
        //             keyboardType="default"
        //             placeholderTextColor="#888"
        //             autoCapitalize="none"
        //             value={formData.Color}
        //             onChangeText={(e)=>{setFormData({...formData, Color:e});Formerror({ ...Error, Color: '' });}}
        //           />
        //         </View>
        //       </View>
        //     </View>
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        //       <View style={{ flex: 1, marginRight: 10 }}>
        //         <Text style={styles.label}>Birth Control</Text>
        //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //           {["Yes", "No"].map((option) => (
        //             <TouchableOpacity
        //               key={option}
        //               style={[
        //                 styles.radioBtn,
        //                 formData.BirthControl === option && 
        //                   option === "Yes" ? styles.greenBorder : styles.redBorder
        //               ]}
        //               onPress={() => {
        //                 setFormData({ ...formData, BirthControl: option });
        //                 Formerror({ ...Error, BirthControl: '' });
        //               }}
        //             >
        //               <Ionicons 
        //                 name={formData.BirthControl === option ? "radio-button-on" : "radio-button-off"} 
        //                 size={22} 
        //                 color={option === "Yes" ? "#4CAF50" : "#F44336"}
        //               />
        //               <Text style={styles.radioText}>{option}</Text>
        //             </TouchableOpacity>
        //           ))}
        //         </View>
        //       </View>
        //       <View style={{ flex: 1 }}>
        //         <Text style={styles.label}>Gender</Text>
        //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //           {["Male", "Female"].map((option) => (
        //             <TouchableOpacity
        //               key={option}
        //               style={[
        //                 styles.radioBtn,
        //                 formData.Gender === option && 
        //                   option === "Yes" ? styles.greenBorder : styles.redBorder
        //               ]}
        //               onPress={() => {
        //                 setFormData({ ...formData, Gender: option });
        //                 Formerror({ ...Error, Gender: '' });
        //               }}
        //             >
        //               <Ionicons 
        //                 name={formData.Gender === option ? "radio-button-on" : "radio-button-off"} 
        //                 size={22} 
        //                 color={option === "Male" ? "#4CAF50" : "#F44336"}
        //               />
        //               <Text style={styles.radioText}>{option}</Text>
        //             </TouchableOpacity>
        //           ))}
        //         </View>
        //       </View>
        //     </View>
        //     <TouchableOpacity onPress={handleSubmit} style={{
        //       backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center'
        //     }}>
        //       <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{Register}</Text>
        //     </TouchableOpacity>
        //   </KeyboardAwareScrollView> </KeyboardAvoidingView>
        // </View>
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
                      
             <View style={{ height: 85, zIndex: 3 ,}}>
               <Text style={styles.label}>City</Text>
               <DropDownPicker
                 open={openCity}
                 value={formData.City}
                 items={cityItems}
                 setOpen={setOpenCity}
                  // setValue={(callback) => {
                  //   setFormData(prev => ({
                  //     ...prev,
                  //     City: callback(prev.City)
                  //   }));
                  //   Formerror({ ...Error, City: '' });
                  // }}
                 setValue={(callback) => {
                   const newCity = callback(formData.City);
                   handleCityChange(newCity);   // 🔹 function call
                 }}
                 setItems={setCityItems}
                 placeholder="Select City"
                 style={[{ borderColor: '#ccc',minHeight: 40} ,Error.City && { borderColor: 'red', borderWidth: 1 }]}
                 dropDownContainerStyle={{borderColor: '#ccc',maxHeight: 200}}
                 listItemContainerStyle={{height: 40 }}
               />
             </View>
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
      : ""}
      {step === 1 ? 
        < >
          {rfidCode && Loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="Blue" />
              <Text>Loading ...</Text>
            </View>
          ) : (
            <View style={styles.container2}>        
              <Ionicons name="qr-code-outline" size={100} color="#4A90E2"  />
              <Text style={styles.title}>Scan Your RFID Card</Text>
              <Text style={styles.subtitle}>
                Please place your RFID card near the reader to scan the ID.
              </Text>
              <TouchableOpacity style={styles.scanButton2} 
                onPress={handleStartScan}
                // disabled={!!rfidCode}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.scanButtonText}>
                    {rfidCode && scanning ? 'Tag Scanned' : scanning ? 'Scanning...' : 'Start Scanning'}
                  </Text>
                  {scanning && !rfidCode && (
                    <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
                  )}
                </View>
              </TouchableOpacity>
              {scanning && (
                <TextInput
                  ref={inputRef}
                  value={rfidCode}
                  onChangeText={(e)=>handleInputChange(e)}
                  style={styles.hiddenInput}
                  autoFocus
                  blurOnSubmit={false}
                />
              )}
            </View>
          )}
        </>
      :""}
      {step === 2 ? 
        < >
          {rfidCode && Loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="Blue" />
              <Text>Loading ...</Text>
            </View>
          ) : (
            <View style={styles.container2}>        
              <Ionicons name="qr-code-outline" size={100} color="#4A90E2"  />
              <Text style={styles.title}>Scan Your RFID Card</Text>
              <Text style={styles.subtitle}>
                Please place your RFID card near the reader to scan the ID.
              </Text>
              <TouchableOpacity style={styles.scanButton2} 
                onPress={handleStartScaning}
                disabled={!!rfidCode}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.scanButtonText}>
                    {rfidCode && scanning ? 'Tag Scanned' : scanning ? 'Scanning...' : 'Start Scanning'}
                  </Text>
                  {scanning && !rfidCode && (
                    <ActivityIndicator color="#fff" style={styles.loadingIndicator} />
                  )}
                </View>
              </TouchableOpacity>
              {scanning && (
                <TextInput
                  ref={inputRef}
                  value={rfidCode}
                  onChangeText={(e)=>handleChange(e)}
                  style={styles.hiddenInput}
                  autoFocus
                  blurOnSubmit={false}
                />
              )}
            </View>
          )}
        </>
      :""}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={petModalStyles.overlay}>
          <View style={petModalStyles.card}>
            <TouchableOpacity
              style={petModalStyles.closeBtn}
              onPress={() => {
                setModalVisible(false);
                setStep(2);
                setScanning(false)
                setrfidCodegetData("");
              }}
            >
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}contentContainerStyle={{ paddingBottom: 130 }}>
              {petData?.Picture ? (
                <Image
                  source={{ uri: petData.Picture }}
                  style={petModalStyles.petImage}
                />
              ) : (
                <View style={petModalStyles.placeholderImage}>
                  <Text style={petModalStyles.placeholderText}>No Image</Text>
                </View>
              )}
              <Text style={petModalStyles.title}>🐾 Pet Information</Text>
              <View style={petModalStyles.infoContainer}>
                {petData &&
                  Object.keys(petData)
                  .filter(
                    (key) =>
                      key !== "createdAt" &&
                      key !== "id" &&
                      key !== "updatedAt" &&
                      key !== "Picture"
                  )
                  .sort((a, b) => a.localeCompare(b))
                  .map((key) => {
                    let value = String(petData[key]);
                    if (key.toLowerCase() === "age") {
                      const num = Number(value);
                      if (!isNaN(num)) {
                        value = `${num} ${num === 1 ? "year" : "years"}`;
                      }
                    }
                    if (key.toLowerCase() === "height") {
                      const num = Number(value);
                      if (!isNaN(num)) {
                        value = `${num} cm`;
                      }
                    }
                    if (key.toLowerCase() === "weight") {
                      const num = Number(value);
                      if (!isNaN(num)) {
                        value = `${num} kg`;
                      }
                    }
                    return (
                      <View style={petModalStyles.infoRow} key={key}>
                        <Text style={petModalStyles.infoLabel}>
                          {key.toLowerCase() === "rfidcode" ? "ID" : key}
                        </Text>
                        <Text style={petModalStyles.infoValue}>{value}</Text>
                      </View>
                    );
                  })
                }
              </View>
              <TouchableOpacity style={petModalStyles.actionBtn} onPress={handleUpdate}>
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={petModalStyles.actionText}>Edit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconWrapper}>
              <Text style={styles.warningIcon}>⚠️</Text>
            </View>
    
            <Text style={styles.warningTitle}>Birth Control Not Done</Text>
      
            <Text style={styles.warningText}>
              This dog has not had birth control. Please provide a reason before proceeding.
            </Text>
            <View style={[styles.input,Error.reason && { borderColor: 'red', borderWidth: 1 }]}>
            <TextInput
              placeholder="Enter reason..."
              value={reason}
              onChangeText={setReason}
              multiline
              placeholderTextColor="#888"
            />
      
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.confirmBtn]} onPress={handleConfirm}>
                <Text style={styles.btnText}>Yes, Proceed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => [setShowModal(false),setLoading(false)]}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      <Modal visible={showModal} transparent animationType="fade">
  <View style={neatModalStyles.overlay}>
    <View style={neatModalStyles.card}>
      
      {/* Warning Icon */}
      <View style={neatModalStyles.iconCircle}>
        <Text style={neatModalStyles.iconText}>⚠️</Text>
      </View>

      {/* Title */}
      <Text style={neatModalStyles.title}>Birth Control Not Done</Text>

      {/* Description */}
      <Text style={neatModalStyles.description}>
        This dog has not had birth control. Please provide a reason before proceeding.
      </Text>

      {/* Input */}
      <TextInput
        style={[
          neatModalStyles.inputBox,
          Error.reason && { borderColor: "red" }
        ]}
        placeholder="Enter reason..."
        placeholderTextColor="#999"
        value={reason}
        onChangeText={setReason}
        multiline
      />

      {/* Buttons */}
      <View style={neatModalStyles.buttonRow}>
        <TouchableOpacity
          style={[neatModalStyles.button, neatModalStyles.confirmBtn]}
          onPress={handleConfirm}
        >
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
    )}</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  actionButton: {
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  scanButton: {
    backgroundColor: '#2196F3',
  },
  buttonIcon: {
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  actionButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
gradientBackground: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  position: 'relative',
},
label: {
  fontWeight: '600',
  marginBottom: 5,
  marginTop: 10,
  color: '#333'
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  backgroundColor: '#fff',
  marginBottom: 3
},
radioBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20
},
radioText: {
  marginLeft: 5,
  fontSize: 15,
  color: '#333'
}
,container2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  scanButton2: {
    marginTop: 30,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scannerContainer : {width: '100%',alignItems: 'center',marginTop: 20},
  scannerVisual    : {width: 200,height: 200,borderRadius: 20,backgroundColor: '#f5f5f5',borderWidth: 2,borderColor: '#e0e0e0',justifyContent: 'center',alignItems: 'center',overflow: 'hidden',marginBottom: 30,position: 'relative',},
  hiddenInput      : {position: 'absolute',opacity: 0,height: 0,width: 0,}, 
  scanButtonDisabled :{backgroundColor: '#4CAF50',},
  loadingIndicator   :{marginLeft: 10,},
  controlsContainer :{width: '100%',alignItems: 'center',},
  scanLine         :{position: "absolute",top: 0,width: "100%",height: 4,backgroundColor: "red",opacity: 0.8,},
  successIcon       :{backgroundColor: 'rgba(255,255,255,0.9)',borderRadius: 30,},
buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
  inputWrapper2      : {width:"48%",justifyContent: 'center',borderWidth: 1,borderColor: '#ddd',borderRadius: 8,height: 50,paddingHorizontal: 10,backgroundColor: '#fff',marginBottom: 12,}, 

  Imagecontainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20
  },
  imagePicker: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden'
  },
  petImage: {
    width: '100%',
    height: '100%'
  },
  uploadText: {
    color: '#888',
    marginTop: 5
  },
greenBorder: {
  borderColor: '#4CAF50', // Green border when selected
  // backgroundColor: 'rgba(76, 175, 80, 0.1)' // Light green background
},
redBorder: {
  borderColor: '#F44336', // Red border when selected
  // backgroundColor: 'rgba(244, 67, 54, 0.1)' // Light red background
},
  modalBackground : {flex: 1,backgroundColor: "rgba(0,0,0,0.5)",justifyContent: "center",alignItems: "center",},
  modalContainer  : {width: "90%",backgroundColor: "#fff",borderRadius: 10,padding: 20,maxHeight: "80%",},
  row             : {flexDirection: "row",marginVertical: 5},
  keyText         : {fontWeight: "bold",fontSize: 18,color: "black",fontFamily: "sans-serif",width: 180,},
  valueText       : {fontSize: 18,color: "black",flexShrink: 1,},
  buttonText      : {color: "#fff",fontSize: 16,marginLeft: 5,},
  actionRow       : {flexDirection: "row",justifyContent: "space-around",marginTop: 20,},
  editButton      : {flexDirection: "row",alignItems: "center",backgroundColor: "orange",paddingVertical: 8,paddingHorizontal: 15,borderRadius: 5,},

  
 modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  iconWrapper: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  warningIcon: {
    fontSize: 28,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmBtn: {
    backgroundColor: '#28a745',
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
hospitalDetailRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 8,
},
hospitalText: {
  fontSize: 15,
  marginLeft: 10,
  color: '#555',
  flexShrink: 1,
},hospitalInfoContainer: {
  width: '100%',
  paddingHorizontal: 16,
  marginBottom: 24,
},
hospitalCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
},
hospitalHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
iconContainer: {
  backgroundColor: '#007bff',
  width: 48,
  height: 48,
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},
hospitalTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#333',
},
detailSection: {
  marginBottom: 18,
},
iconTextRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
},
sectionLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#555',
  marginLeft: 8,
},
sectionValue: {
  fontSize: 15,
  color: '#666',
  lineHeight: 22,
  paddingLeft: 36, // Align with icon
},
contactButton: {
  flexDirection: 'row',
  backgroundColor: '#007bff',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 12,
},
contactButtonText: {
  color: '#fff',
  fontWeight: '600',
  marginLeft: 8,
  fontSize: 15,
},
  centerLoading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  loadingText: { marginTop: 8, fontSize: 16, color: "#007bff" },

  submitBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
















const petModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e74c3c",
    borderRadius: 30,
    padding: -3,
    zIndex: 10,
  },
  petImage: {
    width: '60%',
    height: '20%',
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#A5BFDCFF",
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  placeholderText: {
    textAlign: "center",
    color: "#999",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    width:"70%"
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    maxWidth: "60%",
    textAlign: "right",
  },
  actionBtn: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
});








const neatModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconCircle: {
    backgroundColor: "#FFE5E5",
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E74C3C",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmBtn: {
    backgroundColor: "#27AE60",
  },
  cancelBtn: {
    backgroundColor: "#E74C3C",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
