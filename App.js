import React, { useState } from 'react';

import RootStack from './src/navigators/RootStack';

import TabStack from './src/navigators/TabStack';

import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './src/components/CredentialsContext';
import ProfileStack from './src/navigators/ProfileStack';
import DrawerStack from './src/navigators/DrawerStack';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

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

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => { setAppReady(true) }}
        onError={console.warn}
      />)
  }
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      {/* <RootStack /> */}
      {/* <TabStack /> */}
      <DrawerStack />
      {/* <ProfileStack /> */}
    </CredentialsContext.Provider>
  );
}