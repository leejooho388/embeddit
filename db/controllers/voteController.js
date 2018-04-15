const voteController = {
  post: (req, res) => {
    console.log('POST req.body', req.body);
    res.status(200).end();
  },

  delete: (req, res) => {
    console.log('DELETE req.body', req.body);
    res.status(200).end();
  }
}

module.exports = voteController;