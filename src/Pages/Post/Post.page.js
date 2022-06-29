import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// import DropDownPicker from 'react-native-dropdown-picker';

import {
  Screen,
  TextFormInput,
  CoverImagePreview,
  PostTagContainer,
  PostHastag,
  SubmitPost,
  PostTitle,
} from '../../Components';

import {PostController} from '../../Controller';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: '',
      title: '',
      content: '',
      open: false,
      items: [
        {label: 'Design', status: false},
        {label: 'Development', status: false},
        {label: 'Management', status: false},
      ],
    };
  }

  render() {
    return (
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextFormInput
            keyboardType="url"
            onChangeText={e => {
              this.setState({imageLink: e});
            }}
            placeholder="link gambar"
          />
          <Text style={{marginTop: 10, fontSize: 12}}>gambar</Text>
          <CoverImagePreview
            source={{
              uri: this.state.imageLink === '' ? null : this.state.imageLink,
            }}
          />
          <TextFormInput
            onChangeText={e => {
              this.setState({title: e});
            }}
            textAlignVertical={'top'}
            style={{height: 60}}
            multiline={true}
            numberOfLines={3}
            placeholder="Judul"
          />
          <TextFormInput
            onChangeText={e => {
              this.setState({content: e});
            }}
            textAlignVertical={'top'}
            style={{height: 300}}
            multiline={true}
            numberOfLines={3}
            placeholder="Ketik disini"
          />
          <PostTagContainer>
            {this.state.items.map((item, index) => {
              // console.log('index', item, index);
              return (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    var data = {...this.state};
                    data.items[index].status = !this.state.items[index].status;
                    this.setState(data);
                  }}
                  style={{
                    display: 'flex',
                    borderRadius: 25,
                    borderColor: 'black',
                    borderWidth: 2,
                    padding: 5,
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginRight: 10,
                    backgroundColor: this.state.items[index].status
                      ? 'black'
                      : null,
                  }}>
                  <PostHastag
                    style={{
                      color: this.state.items[index].status ? 'white' : 'black',
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </PostHastag>
                </TouchableOpacity>
              );
            })}
          </PostTagContainer>
          <SubmitPost
            onPress={() => {
              console.log('POSTED');
              if (
                this.state.title === '' ||
                this.state.imageLink === '' ||
                this.state.content === ''
              ) {
                Alert.alert(
                  'Terdapat form kosong',
                  'Pastikan semua form sudah terisi',
                );
              } else {
                var controller = new PostController();
                controller.CreatePost(
                  this.state.imageLink,
                  this.state.title,
                  this.state.content,
                  this.state.items,
                  err => {
                    if (typeof err === 'undefined') {
                      Alert.alert('Success', 'Berhasil mem-posting blog');
                      this.props.navigation.goBack();
                    } else {
                      Alert.alert('Failed', 'Gagal mem-posting blog');
                    }
                  },
                );
              }
            }}>
            <PostTitle style={{fontSize: 18, color: 'white'}}>Post</PostTitle>
          </SubmitPost>
        </ScrollView>
      </Screen>
    );
  }
}
