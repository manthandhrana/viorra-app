import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');

      if (!storedData) {
        Toast.show({
          type: 'error',
          text1: 'No account found',
          text2: 'Please register first',
          visibilityTime: 2000,
          topOffset: 30,
        });
        return;
      }

      const savedUser = JSON.parse(storedData);

      if (email === savedUser.email && password === savedUser.password) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
          visibilityTime: 3000,
          topOffset: 50,
          onHide: () => navigation.navigate('Product'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          text2: 'Email or Password is incorrect',
          visibilityTime: 2000,
          topOffset: 30,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        topOffset: 30,
      });
      console.error(error);
    }
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>

          {/* Image-like Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Hello Again!</Text>
            <Text style={styles.headerSubtitle}>
              Welcome back you've been missed.
            </Text>
          </View>

          {/* Input: Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email Id"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#888"
              style={styles.inputIcon}
            />
          </View>

          {/* Input: Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Feather
                name={secure ? 'eye-off' : 'eye'}
                size={22}
                color="#888"
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or Continue With</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-google" size={24} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-apple" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
          </View>

          {/* Register Text */}
          <Text style={styles.registerText}>
            Not a Member?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={styles.registerLink}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9E7DD',
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingBottom: 30,
    height: height,
  },
  header: {
    backgroundColor: '#EBA8A4',
    width: width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 800,
    fontSize: 30,
    color: '#872341',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 20,
    width: '80%',
    fontWeight: 700,
    color: '#AD7373',
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#d44570ff',
    fontSize: 15,
    fontWeight: 500
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#D65A80',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontWeight: 600
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  registerText: {
    marginTop: 40,
    color: '#444',
    fontSize: 18,
  },
  registerLink: {
    color: '#D65A80',
    fontWeight: 'bold',
  },
  toastSuccess: {
    flexDirection: 'row',
    backgroundColor: '#d4edda',
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 60,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  toastError: {
    flexDirection: 'row',
    backgroundColor: '#f8d7da',
    borderLeftWidth: 5,
    borderLeftColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 60,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  toastTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  toastMessage: {
    color: '#555',
    marginTop: 2,
  },

});

export default LoginScreen;
