import axios from 'axios';
export default class PostController {
  constructor() {
    this.TOKEN =
      '3a2fc16e01559e9fac86230469701661964d3b74ccaa8e2d9ad3383c6a5503ca';
    this.config = {
      headers: {
        Authorization: 'Bearer ' + this.TOKEN,
        'Content-Type': 'application/json',
      },
    };
    this.URL = 'https://gorest.co.in/public/v2/users/1337/posts';
  }
  async CreatePost(url, title, content, tagsList, callback) {
    var tags = [];
    tagsList.map(({label, status}) => {
      if (status) {
        tags.push(label);
      }
    });
    var data = {
      title: JSON.stringify({title, cover_url: url, tag: '#InersIn'}),
      body: JSON.stringify({content, tags}),
    };
    await axios
      .post(this.URL, data, this.config)
      .then(response => {
        callback();
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });

    return null;
  }

  async GetPosts(callback) {
    var posts = [];
    await axios
      .get(this.URL, this.config)
      .then(response => {
        response.data.map(data => {
          if (data.title.includes('#InersIn')) {
            var newData = {
              id: data.id,
              title: JSON.parse(data.title),
              body: JSON.parse(data.body),
            };
            posts.push(newData);
          }
        });
        callback(posts, null);
      })
      .catch(err => {
        console.log(null, err);
      });
  }

  async DeletePost(id, callback) {
    await axios.post(this.URL + '/' + id);
  }
}
