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


const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all fields',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Passwords do not match',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    const user = { name, email, password };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Redicted to login page...',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        onHide: () => navigation.navigate('Login'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Please try again',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
      });
      console.error(error);
    }
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Join The Glow!</Text>
          </View>

          {/* Input: Full Name */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>

          {/* Input: Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
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

          {/* Input: Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={secureConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              <Feather
                name={secureConfirm ? 'eye-off' : 'eye'}
                size={22}
                color="#888"
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <Text style={styles.registerText}>
            Already a Member?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.registerLink}
            >
              Log In
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
    fontWeight: '800',
    fontSize: 28,
    color: '#872341',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
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
  loginButton: {
    width: '100%',
    backgroundColor: '#D65A80',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
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
  registerText: {
    marginTop: 90,
    color: '#444',
    fontSize: 18,
  },
  registerLink: {
    color: '#D65A80',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
