const axios = require('axios');

const handlePostVote = (context, post, i, vote, onFrontPage) => {
  const hasVoteHistory = post.hasOwnProperty('voteHistoryUser');

  post.voteHistoryUser = post.voteHistoryUser || {};

  if (hasVoteHistory && context.props.user._id in post.voteHistoryUser) {
    if (post.voteHistoryUser[context.props.user._id] > 0) {
      // Post was previously upvoted
      if (vote === 'up') {
        // if post is already upvoted and vote is up, unvote
        removeVote(context, post, i, context.props.user._id, -1, onFrontPage);
      } else if (vote === 'down') {
        // if post is already upvoted and vote is down, switch vote to down
        voteOnPost(context, post, i,  context.props.user._id, -2, onFrontPage);
      }
    } else {
      // Post was previously downvoted
      if (vote === 'down') {
        // if post is already downvoted and vote is down, unvote
        removeVote(context, post, i, context.props.user._id, 1, onFrontPage);
      } else if (vote === 'up') {
        // if post is already downvoted and vote is up, switch vote to up
        voteOnPost(context, post, i, context.props.user._id, 2, onFrontPage);
      }
    }
  } else {
    // No previous vote history
    if (vote === 'up') {
      voteOnPost(context, post, i, context.props.user._id, 1, onFrontPage);
    } else {
      voteOnPost(context, post, i, context.props.user._id, -1, onFrontPage);
    }
  }
};

const voteOnPost = (context, post, index, userId, vote, onFrontPage) => {
  const voteInfo = {
    postId: post._id,
    userId,
    vote
  };

  // axios.post('/api/r/:subreddit/:id/vote')
  axios.post(`/api/r/${post.subredditName}/${post._id}/vote`, voteInfo);

  if (onFrontPage) {
    let newStatePosts = context.state.posts;
    let changedPost = newStatePosts[index];
    changedPost.voteHistoryUser[userId] = vote;
    changedPost.voteCount += vote;
    context.setState({
      posts: newStatePosts
    });
  } else {
    // on Post Page
    let newStatePost = context.state.post;
    newStatePost.voteHistoryUser[userId] = vote;
    newStatePost.voteCount += vote;
    context.setState({
      post: newStatePost
    });
  }
};


const removeVote = (context, post, index, userId, vote, onFrontPage) => {

  const voteInfo = {
    postId: post._id,
    userId: userId,
    vote: vote
  }

  // axios.put('/api/r/:subreddit/:id/vote')
  axios.put(`/api/r/${post.subredditName}/${post._id}/vote`, voteInfo);

  if (onFrontPage) {
    let newStatePosts = context.state.posts;
    let changedPost = newStatePosts[index];
    let changedVoteHistory = changedPost.voteHistoryUser;
    delete changedVoteHistory[userId];
    changedPost.voteHistoryUser = changedVoteHistory;
    changedPost.voteCount += vote;
    newStatePosts[index] = changedPost;
    context.setState({
      posts: newStatePosts
    });
  } else {
    // on Post Page
    let newStatePost = context.state.post;
    let changedVoteHistory = newStatePost.voteHistoryUser;
    delete changedVoteHistory[userId];
    newStatePost.voteHistoryUser = changedVoteHistory;
    newStatePost.voteCount += vote;
    context.setState({
      post: newStatePost
    });
  }
};

module.exports = handlePostVote;