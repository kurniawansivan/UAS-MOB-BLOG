import React, {Component} from 'react';

import {Text, View, StatusBar, ScrollView, Dimensions} from 'react-native';
import {Screen, BannerTitle, Title, PostFeed, MakePost} from '../../Components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMessage} from '@fortawesome/free-solid-svg-icons/faMessage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {banner: '', finish: false};
  }

  componentDidMount() {
    const banner = 'Tugas blog UAS MOB';
    var count = 0;
    const typeText = setInterval(() => {
      this.setState({banner: this.state.banner + banner.charAt(count)});
      count++;
      if (count === banner.length) {
        clearInterval(typeText);
        this.setState({finish: true});
      }
    }, 100);
  }

  render() {
    return (
      <Screen>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <BannerTitle>
          <Title>{this.state.banner}</Title>
        </BannerTitle>
        <PostFeed
          animationText={this.state.finish}
          {...this.props.navigation}
        />
        <MakePost
          delayPressIn={1000}
          onPress={() => {
            console.log('make post');
            this.props.navigation.navigate('Home', {screen: 'Post'});
          }}>
          <FontAwesomeIcon
            icon={faMessage}
            style={{color: 'white'}}
            size={20}
          />
        </MakePost>
      </Screen>
    );
  }
}
