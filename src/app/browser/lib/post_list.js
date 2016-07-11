import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Router, Route, Link, browserHistory } from 'react-router'
import ContentAdd from 'material-ui/svg-icons/content/add';
import request from 'browser-request'

var posts = [{title: 'Oh baby', body: 'Food is nice', author: 'ILikeFood'}, {title: 'Suck it', body: 'ILikeFood is a dumbdumb!', author: 'Trollolol'}]

var ulStyle = {
  listStyle: 'none',
  margin: 'auto',
  width: 90 + '%',
  padding: 0
}

Yavanna.provide('PostList', () => {

  return React.createClass({

    getInitialState: function() {
      return {posts: []}
    },

    componentDidMount: function() {
      this.serverRequest = request('/posts', function (er, response, body) {
        var post_list = JSON.parse(body)
        console.log(post_list)
        this.setState({
          posts: post_list
        });
      }.bind(this));
    },

    componentWillUnmount: function() {
      this.serverRequest.abort();
    },

    addPost (){
      browserHistory.push('/new')
    },
    // propTypes: {posts: React.PropTypes.array.isRequired},
    render () {
      var createPost = function (post) {
        return (
          <li style={{ marginTop: 10 }} >
            <Card >
              <CardTitle
                title={post.title}
                subtitle={post.author}
                actAsExpander={true}
                titleStyle={{fontSize: 17, margin: 0, padding: 0}}
                subtitleStyle={{fontSize: 12}}
              />
              <Divider />
              <CardText expandable={true}>
                {post.body}
              </CardText>
            </Card>
          </li>
        )
      }
      if (posts.length === 0) {
        return <p>There are no posts here</p>
      }
      return (
        <div>
          <ul style={ulStyle} >{this.state.posts.map(createPost)}</ul>
          <FloatingActionButton
            onTouchTap={this.addPost}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      )
    }
  })
})
