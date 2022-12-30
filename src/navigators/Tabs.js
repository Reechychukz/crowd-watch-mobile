import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';

import Home from '../screens/Home';
import Post from '../screens/Post';
import Emergency from '../screens/Emergency';
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Post' component={Post} />
            <Tab.Screen name='Emergency' component={Emergency} />
            <Tab.Screen name='Friends' component={Friends} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}

export default Tabs;