import React, {Component} from 'react';

import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import styled from 'styled-components/native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';

const DrawerIcon = styled(FontAwesomeIcon)``;
const CloseIcon = styled(FontAwesomeIcon)`
  color: white;
`;

const DrawerContainer = styled(TouchableOpacity)`
  // margin-left: -5px;
  width: 26px;
  height: 26px;
`;

const CloseContainer = styled(TouchableOpacity)`
  margin: 10px 0 30px 10px;
  width: 38px;
  height: 38px;
`;

class CustomDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <CloseContainer
          onPress={e => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          <CloseIcon icon={faXmark} size={38} />
        </CloseContainer>
        <DrawerItemList style={{paddingTop: 10}} {...this.props} />
      </DrawerContentScrollView>
    );
  }
}

export {DrawerContainer, DrawerIcon, CustomDrawer};
