import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screns/Login';
import Register from '../screns/SignUp';

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