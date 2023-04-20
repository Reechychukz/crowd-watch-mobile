import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../components/style';

import { firebase } from '../../config/firebase'
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { brand } = Colors;
import ProfileStack from '../navigators/ProfileStack';
import RootStack from '../navigators/RootStack';
//import Share from 'react-native-share';

//import files from '../assets/filesBase64';

const Profile = ({ navigation }) => {

  const userInfo = [{
    firstName: 'John',
    lastName: 'Doe',
    userName: 'j_doe',
    state: 'Ondo',
    country: 'Nigeria',
    phoneNumber: '+234 810 310 2363',
    emailAddress: 'john_doe@email.com',
    upvotes: '1,452',
    downVotes: '55',
    rating: '96%'
  }]

  const getUser = async () => {
    console.log(1)
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        console.log(JSON.parse(user));
      }
    }
    catch (error) {
      console.log(error);
      return;
    }
  }
  const handleSignout = async () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      AsyncStorage.removeItem('user');
      return (
        <RootStack />
      )
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
  // const myCustomShare = async () => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     url: files.appLogo,
  //     urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch (error) {
  //     console.log('Error => ', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: '',
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>John Doe</Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Ionicons name="location" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Ondo, Nigeria</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="phone-portrait-outline" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>+234-810-***-2333</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>john_doe@email.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>1,452</Title>
          <Caption>Upvotes</Caption>
        </View>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>55</Title>
          <Caption>Downvotes</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>96%</Title>
          <Caption>Rating</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={brand} size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={getUser}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={Colors.brand} size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color={Colors.brand} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSignout}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" color={Colors.red} size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  userInfoSection: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});