import React from 'react';

import { Colors } from '../components/style';
const { primary, tertiary } = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Verification from '../screens/OtpVerification';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

//Credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import Tabs from './Tabs';

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }

                        }}
                        initialRouteName='Verification'
                    >
                        {storedCredentials ?
                            <Stack.Screen options={{ headerTintColor: primary }} 
                            name="Welcome" component={Welcome} />
                            : <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Signup" component={Signup} />
                                <Stack.Screen name="Verification" component={Verification} />
                            </>
                        }

                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>

    )
}
export default RootStack;