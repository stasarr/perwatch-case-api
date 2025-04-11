const Post = require('../models/post.model');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Gönderiler alınamadı.' });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Gönderiler alınamadı.' });
  }
};

exports.getPostsByTag = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Gönderiler alınamadı.' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Gönderi bilgisi alınamadı.' });
  }
};

exports.createPost = async (req, res) => {
  const { title, body, userId, tags } = req.body;
  try {
    const newPost = new Post({ title, body, userId, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: 'Gönderi oluşturulamadı.' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Gönderi güncellenemedi.' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }
    res.json({ message: 'Gönderi silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Gönderi silinemedi.' });
  }
};
