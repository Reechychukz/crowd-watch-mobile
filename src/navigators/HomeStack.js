import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';

import { Colors } from '../components/style';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();


const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
        >
            <Stack.Screen
                name='HOME'
                component={Home}


                options={{
                    headerLeft: () => (
                        <View style={{ paddingLeft: 15 }}>
                            <FontAwesome
                                name="navicon"
                                size={24}
                                backgroundColor='transparent'
                                color="black"
                                onPress={() => navigation.openDrawer()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 15 }}>
                            <MaterialCommunityIcons
                                name='newspaper-plus'
                                size={25}
                                backgroundColor='transparent'
                                color="black"
                                onPress={() => navigation.navigate('NEW POST')}
                            />
                        </View>
                    ),
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="NEW POST"
                options={{
                    title: 'New Post',
                }}
                component={NewPost}
            />
        </Stack.Navigator>
    )
}

export default HomeStack