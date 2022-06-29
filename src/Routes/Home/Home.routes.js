import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';

import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';

import {Screen, Title, DrawerContainer, DrawerIcon} from '../../Components';
import {Home, Post, PostDetails} from '../../Pages';

const Stack = createNativeStackNavigator();

export default class HomeRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          options={{
            headerLeft: () => {
              return (
                <DrawerContainer
                  onPress={e => {
                    this.props.navigation.dispatch(
                      DrawerActions.toggleDrawer(),
                    );
                  }}>
                  <DrawerIcon icon={faBars} size={26} />
                </DrawerContainer>
              );
            },
            headerTitle: () => {
              return null;
            },
          }}
          name="Feed"
          component={Home}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            headerTransparent: true,
            headerTitle: '',
            statusBarHidden: true,
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    );
  }
}
