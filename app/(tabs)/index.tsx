import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator} from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../src/firebaseConfig"
import Toast from 'react-native-toast-message';
import { useRouter,useLocalSearchParams } from 'expo-router';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {email2} = useLocalSearchParams();

  const handleLogin = async () => {
    if(email === "admin@gmail.com"){
      setLoading(true); 
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential);
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
        });
        setTimeout(() => {
          router.push('/adminwelcome');
              setEmail('');
            setPassword('');
        }, 500);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: "Login failed",
        });
        console.log('Login failed:', error);
      } finally {
        setLoading(false);
      }

    }else{
      setLoading(true); 
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential);
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
        });
        setTimeout(() => {
          router.push({pathname: '/reactComponent/reactdistComponent/karur1',params: { email }});
          setEmail('');
          setPassword('');
        }, 500);


      } catch (error) {
        Toast.show({
          type: 'error',
          text1: "Login failed",
        });
        console.log('Login failed:', error);
      } finally {
        setLoading(false);
      }
      // alert('Only Admin Login')
    }
  };


  return (
    <ImageBackground
      // source={{ uri: "https://images.unsplash.com/photo-1601758003122-58b7a2a5fa1c" }} // 🌟 background image URL
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>PetCare Portal Login</Text>

          {/* Logo */}
          <Text style={styles.logo}>🐶</Text>


          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input with eye toggle */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Ionicons name="log-in-outline" size={20} color="#fff" />
                    <Text type="defaultSemiBold" style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
            )
          }

        </View>
      </View>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
  overlay: { flex: 1, backgroundColor: "rgba(255,255,255,0.85)" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#3f51b5", marginBottom: 10 },
  logo: { fontSize: 50, marginBottom: 10 },
  welcome: { fontSize: 18, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 40 },
  eyeIcon: { padding: 4 },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3f51b5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  loginText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
  quickLogin: {
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  quickText: { fontWeight: "bold", marginBottom: 10 },
  roleButtons: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  roleBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  roleText: { color: "#fff", fontWeight: "bold" },
});
