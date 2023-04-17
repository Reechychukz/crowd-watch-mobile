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


import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { InnerContainer, PageTitle, StyledContainer } from '../components/style';
import Posts from '../components/Posts';

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeLayout}>
        <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
        <ScrollView>
          <Posts navigation={props.navigation} />
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Ionicons
              name='ios-reload-circle-sharp'
              style={{ fontSize: 60, opacity: 0.2 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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