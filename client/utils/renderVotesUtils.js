const renderVoteHelper = (context, postOrComment, isComment) => {

  let upColor = 'grey';
  let downColor = 'grey';
  let numColor = 'grey';
  let userId;

  if (isComment) {
    userId = context.props.userId;
  } else {
    userId = context.props.user._id;
  }

  if (postOrComment.voteHistoryUser && context.props.authenticated) {
    if (userId in postOrComment.voteHistoryUser) {
      if (postOrComment.voteHistoryUser[userId] > 0) {
        upColor = 'orange';
        numColor = '#E37737';
      } else {
        downColor = 'violet';
        numColor = '#5B3FC2';
      }
    }
  }

  const numStyle = {
    'color': numColor,
    'fontWeight': 'bold',
    'fontFamily': 'wide block',
    'fontSize': '20px',
    'marginRight': '3px'
  };

  return {
    upColor,
    downColor,
    numStyle
  }
};

module.exports = renderVoteHelper;






