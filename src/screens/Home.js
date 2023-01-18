import { StatusBar } from 'expo-status-bar'
import React from 'react';
import Constants from 'expo-constants';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native';


import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { InnerContainer, PageTitle, StyledContainer } from '../components/style';
import Posts from '../components/Posts';

const Home = ({ navigation }) => {
  return (
    <View style={styles.homeLayout}>
      <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
      <View style={styles.header}>
        <FontAwesome name="navicon" size={24} color="black" onPress={() => navigation.openDrawer()} />
        <Text style={{ fontFamily: 'roboto-regular', fontSize: 22 }}>
          News Feed
        </Text>
        <FontAwesome name="plus-square-o" size={24} color="black" />
      </View>
      <View style={{

      }}>
      </View>

      <ScrollView>
        <Posts />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeLayout: {
    backgroundColor: 'white',
    height: '100%'
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 15
  }
})