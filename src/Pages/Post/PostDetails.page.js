import React, {Component} from 'react';
import {Image, ScrollView, View, TouchableOpacity} from 'react-native';
import {
  Screen,
  CoverContainer,
  Separator,
  PostTitle,
  PostDesc,
  Title,
  PostHastag,
  PostTitleContainer,
  PostTagContainer,
} from '../../Components';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons';

export default class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.blog = this.props.route.params;
  }
  render() {
    var tags = this.blog.body.tags.map(tag => {
      return <PostHastag>#{tag}</PostHastag>;
    });

    return (
      <ScrollView style={{display: 'flex'}}>
        <CoverContainer>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: this.blog.title.cover_url}}
          />
        </CoverContainer>
        <View style={{marginHorizontal: 15}}>
          <View
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity>
              <FontAwesomeIcon style={{marginRight: 15}} icon={faPencil} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesomeIcon icon={faTrashCan} />
            </TouchableOpacity>
          </View>
          <PostTitleContainer
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}>
            <Title>{this.blog.title.title}</Title>
          </PostTitleContainer>
          <Separator />
          <PostTitleContainer style={{marginTop: 30, marginBottom: 30}}>
            <PostDesc>{this.blog.body.content}</PostDesc>
          </PostTitleContainer>
          <Separator />
          <PostTagContainer style={{marginTop: 30}}>{tags}</PostTagContainer>
        </View>
      </ScrollView>
    );
  }
}
