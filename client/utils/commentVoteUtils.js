const axios = require('axios');

const handleCommentVote = (context, comment, userId, vote) => {
  const hasVoteHistory = comment.hasOwnProperty('voteHistoryUser');

  comment.voteHistoryUser = comment.voteHistoryUser || {};

  if (hasVoteHistory && userId in comment.voteHistoryUser) {
    if (comment.voteHistoryUser[userId] > 0) {
      // Comment was previously upvoted
      if (vote === 'up') {
        // if comment is already upvoted and vote is up, unvote
        removeVote(context, comment, userId, -1);
      } else if (vote === 'down') {
        // if comment is already upvoted and vote is down, switch vote to down
        voteOnComment(context, comment, userId, -2);
      }
    } else {
      // Post was previously downvoted
      if (vote === 'down') {
        // if comment is already downvoted and vote is down, unvote
        removeVote(context, comment, userId, 1);
      } else if (vote === 'up') {
        // if comment is already downvoted and vote is up, switch vote to up
        voteOnComment(context, comment, userId, 2);
      }
    }
  } else {
    // No previous vote history
    if (vote === 'up') {
      voteOnComment(context, comment, userId, 1);
    } else {
      voteOnComment(context, comment, userId, -1);
    }
  }
};

const voteOnComment = (context, comment, userId, vote) => {
  const voteInfo = {
    commentId: comment._id,
    userId,
    vote
  };

  // axios.post('/api/comment/vote/:comment_id')
  axios.post(`/api/comment/vote/${comment._id}`, voteInfo);

  let newStateComment = context.state.comment;
  newStateComment.voteHistoryUser[userId] = vote;
  newStateComment.voteCount += vote;
  context.setState({
    comment: newStateComment
  });
};


const removeVote = (context, comment, userId, vote) => {

  const voteInfo = {
    commentId: comment._id,
    userId: userId,
    vote: vote
  }

  // axios.put('/api/comment/vote/:comment_id')
  axios.put(`/api/comment/vote/${comment._id}`, voteInfo);

  let newStateComment = context.state.comment;
  let changedVoteHistory = newStateComment.voteHistoryUser;
  delete changedVoteHistory[userId];
  newStateComment.voteHistoryUser = changedVoteHistory;
  newStateComment.voteCount += vote;
  context.setState({
    comment: newStateComment
  });
};

module.exports = handleCommentVote;