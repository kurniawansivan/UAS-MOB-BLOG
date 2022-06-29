import React, {Component} from 'react';

import {Text, View, Dimensions, SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeRoute} from './Routes';
import {CustomDrawer} from './Components';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#282828',
              width: Dimensions.get('window').width,
            },
            drawerContentContainerStyle: {
              alignItems: 'center',
            },
            drawerLabelStyle: {
              width: '100%',
              fontSize: 18,
              fontWeight: 'bold',
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: 'white',
            },
            drawerActiveTintColor: '#3d3c3c',
            drawerInactiveTintColor: 'white',
            drawerActiveBackgroundColor: null,
          }}>
          <Drawer.Screen name="Home" component={HomeRoute} />
          <Drawer.Screen name="Notifications" component={HomeRoute} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

// {
//   "id": 2677,
//   "name": "anonymous",
//   "email": "anonymous@gmail.com",
//   "gender": "male",
//   "status": "active"
// }
