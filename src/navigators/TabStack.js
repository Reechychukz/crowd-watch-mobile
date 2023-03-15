import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import Emergency from '../screens/Emergency';
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';
import TapBar from '../components/TapBar';
import { NavigationContainer } from '@react-navigation/native';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        // <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Emergency'
                headerShown='false'

                tapBar={props => <TapBar {...props} />}>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        )
                    }} />

                <Tab.Screen
                    name='Emergency'
                    component={Emergency}
                    options={{
                        tabBarLabel: 'Emergency',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="alert-circle" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Friends'
                    component={Friends}
                    options={{
                        tabBarLabel: 'Friends',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-group" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen
                    name='Profile'
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        headerShadowVisible: false,
                        tabBarShowLabel: false,
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    )
}

export default TabStack;