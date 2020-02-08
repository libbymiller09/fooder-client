import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';
import DeletePost from './DeletePost';
import { likePost, unlikePost } from '../redux/actions/dataActions';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Chat, Favorite, FavoriteBorder } from '@material-ui/icons';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post : {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        postId
      },
      user: {
        authenticated,
        credentials: {
          handle
        }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip='Like'>
        <Link to='/login'>
          <FavoriteBorder color='primary' />
        </Link>
      </MyButton>
    ) : (
      this.likedPost() ? (
        <MyButton tip='Unlike' onClick={this.unlikePost}>
          <Favorite color='primary' />
        </MyButton>
      ) : (
        <MyButton tip='Like' onClick={this.likePost}>
          <FavoriteBorder color='primary' />
        </MyButton>
      )
    );

    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId}/>
    ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <Chat color='primary' />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
