import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Alert
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUser(parsed);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Header */}
        <View style={styles.profileBox}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: user?.avatar || 'https://randomuser.me/api/portraits/men/43.jpg',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{user?.name || 'Guest'}</Text>
              <Text style={styles.email}>{user?.email || 'Not available'}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Feather name="edit-3" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Section 1 */}
        <View style={styles.card}>
          <ProfileItem icon="map-pin" label="Address" />
          <ProfileItem icon="shopping-bag" label="Order History" />
          <ProfileItem icon="globe" label="Language" />
          <ProfileItem icon="bell" label="Notifications" />
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <ProfileItem icon="headphones" label="Contact Us" />
          <ProfileItem icon="help-circle" label="Get Help" />
          <ProfileItem icon="shield" label="Privacy Policy" />
          <ProfileItem icon="file-text" label="Terms and Conditions" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <FooterItem icon="home-outline" label="Home" onPress={() => navigation.navigate('Product')} />
        <FooterItem icon="pricetag-outline" label="Offers" />
        <FooterItem icon="heart-outline" label="Wishlist" onPress={() => navigation.navigate('Wishlist')} />
        <FooterItem icon="person-outline" label="Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
};

const ProfileItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemLeft}>
      <Feather name={icon} size={20} color="#333" style={{ marginRight: 10 }} />
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={18} color="#888" />
  </TouchableOpacity>
);


const FooterItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#333" />
    <Text style={styles.footerText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F2',
  },
  scroll: {
    padding: 16,
    paddingBottom: 120,
  },
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 40
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  email: {
    fontSize: 13,
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  logoutBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

export default ProfileScreen;
