const validator = require('express-validator');
const Post = require('../models/post');

const validatorBody = validator.body;

async function getPosts() {
  return Post.find()
    .populate('user')
    .exec();
}

exports.post_list_get = async (req, res) => {
  if (!req.user) {
    res.redirect('/sign-in');
  }

  res.locals.currentUser = req.user;
  const listPost = await getPosts();
  res.render('post_list', { post_list: listPost });
};

exports.post_create_get = (req, res) => {
  if (!req.user) {
    res.redirect('/sign-in');
  }

  res.locals.currentUser = req.user;
  res.render('post_form');
};

async function createNewPost(req) {
  return new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.user._id,
  });
}

exports.post_create_post = [

  validatorBody('title', 'Title is required').trim().isLength({ min: 1 }).escape(),
  validatorBody('body', 'Body is required').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.render('post_form', { errors: errors.array() });
    } else {
      const post = await createNewPost(req);
      post.save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/post');
      });
    }
  },
];

async function deletePost(postId) {
  return Post.findByIdAndRemove(postId);
}

exports.post_delete_post = async (req, res) => {
  await deletePost(req.body.postId);
  res.redirect('/post');
};
