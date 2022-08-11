import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/SignUp';

const stackNavigatorOptions = {
    headerShown: false
}
const AppNavgator = createStackNavigator ({
    Login: {screen: Login},
    Register: {screen: Register},
},
{
    defaultNavigationOptions: stackNavigatorOptions
}
);

export default createAppContainer(AppNavgator)