import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {
  Separator,
  PostTitle,
  PostDesc,
  PostTitleContainer,
  PostTagContainer,
  PostHastag,
} from '../../Components';

import {PostController} from '../../Controller';

export default class PostFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {finish: false, currenttab: 0, blog: []};
    this.flatListRef = React.createRef();
    this.color = ['red', 'green', 'yellow', 'blue'];
    this.componentSize = {};
    this.postContent = [
      {name: 'Latest', component: this.Latest},
      {name: 'Design', component: this.Design},
      {name: 'Development', component: this.Development},
      {name: 'Management', component: this.Management},
    ];

    this.PageNavigate = this.PageNavigate.bind(this);
    this.IsActive = this.IsActive.bind(this);
    this.Renderer = this.Renderer.bind(this);
  }

  OnLoad(props) {
    return (
      <View style={{width: props.size.width}}>
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#d6d6d6',
            marginVertical: 15,
          }}
        />
        <View
          style={{
            marginVertical: 10,
            width: '50%',
            height: 25,
            backgroundColor: '#d6d6d6',
          }}
        />
        <View
          style={{
            marginTop: 10,
            width: '70%',
            height: 15,
            backgroundColor: '#d6d6d6',
          }}
        />
        <View
          style={{
            marginTop: 4,
            width: '90%',
            height: 15,
            backgroundColor: '#d6d6d6',
          }}
        />
        <View
          style={{
            marginTop: 4,
            width: '60%',
            height: 15,
            backgroundColor: '#d6d6d6',
          }}
        />
        <View
          style={{
            display: 'flex',
            marginTop: 20,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              width: 80,
              backgroundColor: '#d6d6d6',
              height: 18,
              marginHorizontal: 5,
            }}
          />
          <View style={{width: 80, backgroundColor: '#d6d6d6', height: 18}} />
        </View>
      </View>
    );
  }

  Renderer(props) {
    var blog = props.blog;
    if (blog.length > 0) {
      var blogs = blog.map(data => {
        if (typeof data !== 'undefined') {
          var tags = data.body.tags.map(tag => {
            return <PostHastag>#{tag}</PostHastag>;
          });
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigate('Home', {screen: 'PostDetails', params: data});
              }}
              delayPressIn={1000}
              key={data.title.title}>
              <View style={{width: props.size.width}}>
                <View
                  style={{
                    width: '100%',
                    height: 235,
                    backgroundColor: '#d6d6d6',
                    marginTop: 15,
                    marginBottom: 30,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{
                      uri: data.title.cover_url,
                    }}
                  />
                </View>
                <Separator />
                <PostTitleContainer>
                  <PostTitle>{data.title.title}</PostTitle>
                </PostTitleContainer>
                <Separator />
                <PostTitleContainer>
                  <PostDesc>{data.body.content}</PostDesc>
                </PostTitleContainer>
                <PostTagContainer>{tags}</PostTagContainer>
              </View>
            </TouchableWithoutFeedback>
          );
        }
      });
      return (
        <ScrollView key={props.name} showsVerticalScrollIndicator={false}>
          {blogs}
        </ScrollView>
      );
    }
    return null;
  }

  Latest(props) {
    return <props.renderer key="latest" {...props} name="latest" />;
  }

  Design(props) {
    var blog = props.blog.map(data => {
      if (data.body.tags.indexOf('Design') > -1) {
        return data;
      }
    });

    return (
      <props.renderer
        blog={blog}
        size={props.size}
        navigate={props.navigate}
        name="design"
      />
    );
  }

  Development(props) {
    var blog = props.blog.map(data => {
      if (data.body.tags.indexOf('Development') > -1) {
        return data;
      }
    });
    return (
      <props.renderer
        blog={blog}
        size={props.size}
        navigate={props.navigate}
        name="development"
      />
    );
  }

  Management(props) {
    var blog = props.blog.map(data => {
      if (data.body.tags.indexOf('Management') > -1) {
        return data;
      }
    });
    return (
      <props.renderer
        blog={blog}
        size={props.size}
        navigate={props.navigate}
        name="management"
      />
    );
  }

  tabBarHead(props) {
    return (
      <ScrollView horizontal={true} bounces={false}>
        {props.postContent.map(({name}, index) => {
          const status = props.isActive(index);
          return (
            <View
              key={'tab-' + name}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                padding: 10,
                paddingHorizontal: 20,
                borderTopWidth: status ? 3 : 2,
                borderTopColor: status ? 'black' : '#d6d6d6',
              }}>
              <TouchableOpacity
                onPress={e => {
                  props.pageNavigate(index);
                }}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontWeight: 'bold',
                    color: status ? 'black' : '#b3b3b3',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  PostContent(item, index, size, renderer) {
    return (
      <item.component
        key={index}
        size={size}
        item={item}
        renderer={renderer}
        blog={this.state.blog}
        {...this.props}
      />
    );
  }

  IsActive(index) {
    return this.state.currenttab === index;
  }

  PageNavigate(index) {
    this.flatListRef.current.scrollToIndex({animated: true, index: index});
    if (this.state.currenttab !== index) {
      this.setState({currenttab: index});
    }
  }

  async GetBlog() {
    var postController = new PostController();
    await postController.GetPosts((data, err) => {
      if (err === null) {
        this.setState({blog: data});
      }
    });
    this.setState({finish: true});
  }

  async componentDidMount() {
    this.GetBlog();
    // if (this.props.animationText) {
    // }
  }

  render() {
    return (
      <View
        onLayout={({nativeEvent}) => {
          if (typeof this.componentSize.width === 'undefined') {
            this.componentSize = {
              width: nativeEvent.layout.width,
              height: nativeEvent.layout.height,
            };
          }
          this.setState({finish: true});
        }}
        style={{flex: 1, marginTop: 20}}>
        <this.tabBarHead
          pageNavigate={this.PageNavigate}
          postContent={this.postContent}
          isActive={this.IsActive}
        />
        {this.state.finish ? (
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            data={this.postContent}
            renderItem={({item, index}) => {
              return this.PostContent(
                item,
                index,
                this.componentSize,
                this.Renderer,
              );
            }}
            snapToAlignment={'start'}
            snapToInterval={this.componentSize.width}
            decelerationRate={'fast'}
            bounces={false}
            keyExtractor={item => item.name}
            ref={this.flatListRef}
            onMomentumScrollEnd={e => {
              const index = Math.floor(
                Math.floor(e.nativeEvent.contentOffset.x) /
                  Math.floor(e.nativeEvent.layoutMeasurement.width),
              );
              if (this.state.currenttab !== index) {
                this.setState({currenttab: index});
              }
            }}
          />
        ) : (
          <View
            onLayout={({nativeEvent}) => {
              if (typeof this.componentSize.width === 'undefined') {
                this.componentSize = {
                  width: nativeEvent.layout.width,
                  height: nativeEvent.layout.height,
                };
              }
            }}
          />
        )}
      </View>
    );
  }
}
