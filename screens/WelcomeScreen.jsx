// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Full width image */}
      <Image
        source={require('../assets/welcome.png')} // replace with your own image
        style={styles.image}
      />

      {/* Text & Button Section */}
      <View style={styles.content}>
        <Text style={styles.title}>Viorra</Text>
        <Text style={styles.subtitle}>Your Beauty, Delivered.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9a7a2',
  },
  image: {
    width: width,
    height: height * 0.65, // image takes ~45% of screen height
    resizeMode: 'cover', // use 'contain' if you want to avoid cropping
  },
  content: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontFamily:"italiana",
    fontWeight: 400,
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontFamily:"Inter",
    fontSize: 22,
    color: 'white',
    fontWeight:300,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#D65A80',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
