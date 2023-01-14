import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../screens/Profile';
import EditProfileScreen from '../screens/EditProfileScreen';

import { Colors } from '../components/style';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const { tertiary } = Colors;

const Stack = createStackNavigator();

const ProfileStack = ({ navigation }) => {
    const colors = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                // headerStyle: {
                //     backgroundColor: 'transparent',
                //     shadowColor: colors.background, // iOS
                //     elevation: 0, // Android
                // },
                // headerTintColor: tertiary,
                // headerTransparent: true,
                // headerTitle: '',
                // headerLeftContainerStyle: {
                //     paddingLeft: 15
                // }

            }}
            initialRouteName='Profile'
        >
            <Stack.Screen
                name='Profile'
                component={Profile}
                

                options={{
                    headerLeft: () => (
                        <View style={{ paddingLeft: 15 }}>
                            <Ionicons.Button
                                name='ios-menu'
                                size={25}
                                backgroundColor={Colors.darkLight}
                                paddingLeft={10}
                                alignitems='center'
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 0 }}>
                            <MaterialCommunityIcons.Button
                                name='account-edit'
                                size={25}
                                backgroundColor={Colors.gray}
                                onPress={() => navigation.navigate('EditProfile')}
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="EditProfile"
                options={{
                    title: 'Edit Profile',
                }}
                component={EditProfileScreen}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack