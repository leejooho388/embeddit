const renderVoteHelper = (context, post) => {

  let upColor = 'grey';
  let downColor = 'grey';
  let numColor = 'grey';

  if (post.voteHistoryUser && context.props.authenticated) {
    if (context.props.user._id in post.voteHistoryUser) {
      if (post.voteHistoryUser[context.props.user._id] > 0) {
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






