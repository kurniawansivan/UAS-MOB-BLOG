import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import styled from 'styled-components/native';
import {DrawerContainer, DrawerIcon, CustomDrawer} from './Drawer/Drawer';

import PostFeed from './Post/PostFeed';

const Screen = styled(View)`
  flex: 1;
  padding: 0 15px 0 15px;
  background-color: white;
`;

const BannerTitle = styled(View)`
  width: 70%;
  height: 70px;
  margin: 20px 0;
`;

const Title = styled(Text)`
  font-family: 'Product Sans - Medium';
  color: black;
  font-weight: bold;
  font-size: 30px;
`;

const PostTitle = styled(Text)`
  font-family: 'Product Sans - Medium';
  color: black;
  font-weight: bold;
  font-size: 24px;
`;

const PostDesc = styled(Text)`
  font-family: 'Product Sans - Medium';
  color: black;
  font-size: 14px;
`;

const PostTitleContainer = styled(View)`
  margin: 15px 0;
`;

const Separator = styled(View)`
  width: 100%;
  background-color: black;
  height: 1.3px;
`;

const PostTagContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const PostHastag = styled(Text)`
  margin-right: 10px;
  font-family: 'Product Sans - Medium';
  color: #b3b3b3;
  font-size: 14px;
`;

const MakePost = styled(TouchableOpacity)`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 25px;
  right: 15px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const TextFormInput = styled(TextInput)`
  display: flex;
  border: 2px solid black;
  height: 40px;
  margin: 10px 0;
  justify-content: flex-start;
`;

const CoverImagePreview = styled(Image)`
  width: 100%;
  height: 235px;
  background-color: #d6d6d6;
  margin: 10px 0;
`;

const SubmitPost = styled(TouchableOpacity)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 90px;
  height: 40px;
  background-color: black;
  right: 0;
`;

const CoverContainer = styled(View)`
  width: 100%;
  height: 300px;
`;

export {
  Screen,
  DrawerContainer,
  DrawerIcon,
  BannerTitle,
  Title,
  PostTitle,
  PostDesc,
  PostTitleContainer,
  PostTagContainer,
  PostHastag,
  Separator,
  MakePost,
  TextFormInput,
  CoverImagePreview,
  SubmitPost,
  CoverContainer,
  CustomDrawer,
  PostFeed,
};
