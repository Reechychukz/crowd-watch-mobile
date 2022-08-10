import React from 'react';

import AppNavigator from './src/navigations/Navigator';

//screens
import Login from './src/screens/Login';
import Signup from './src/screens/SignUp';
import Welcome from './src/screens/Welcome';

export default function App() {
  return (
    <Signup />
  );
}