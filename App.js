import React, { useEffect, useState } from 'react';

import RootStack from './src/navigators/RootStack';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import "setimmediate";

import {firebase} from './config/firebase';

import { CredentialsContext } from './src/components/CredentialsContext';
import DrawerStack from './src/navigators/DrawerStack';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  const [initializing, setInitializing] = useState(true)
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [user, setUser] = useState()

  let [fontsLoaded] = useFonts({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
  })

  //Handle User state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
        <RootStack />
      </CredentialsContext.Provider>
    )
  }

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('crowdWatchCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          storedCredentials(null);
        }
      })
      .catch(error => console.log(error));
  }

  if (!appReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => { setAppReady(true) }}
        onError={console.warn}
      />)
  }
  return (
    <CredentialsContext.Provider value={{ storedCredentials }}>
      <DrawerStack />
    </CredentialsContext.Provider>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}