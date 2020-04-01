import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import searchResultDetailScreen from '../src/screens/searchResultDetail';
import loginScreen from '../src/screens/login';
import forgotPasswordScreen from './screens/forgotPassword';

const AuthNavigator = createStackNavigator(
  {
    Login: {screen: loginScreen},
    ForgotPassword: {screen: forgotPasswordScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'ForgotPassword',
  },
);

const HomeNavigator = createStackNavigator(
  {
    SearchResultDetail: {screen: searchResultDetailScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'SearchResultDetail',
  },
);

export const Router = createAppContainer(
  createSwitchNavigator({
    Auth: AuthNavigator,
    Home: HomeNavigator,
  }),
);
