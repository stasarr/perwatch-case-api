// src/controllers/user.controller.js
const Joi = require('joi');
const User = require('../models/user.model');

// Kullanıcı listesi almak
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Kullanıcılar alınamadı.' });
  }
};

// Belirli kullanıcıyı ID ile almak
exports.getUserById = async (req, res) => {
  // ID doğrulaması (Joi ile)
  const schema = Joi.object({
    id: Joi.string().length(24).hex().required()  // MongoDB ObjectID formatı
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Kullanıcı bilgisi alınamadı.' });
  }
};

// Yeni kullanıcı oluşturmak
exports.createUser = async (req, res) => {
  // Kullanıcı verisi doğrulaması (Joi ile)
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).required(),
    createdAt: Joi.date().optional()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, age, createdAt } = req.body;

  try {
    const newUser = new User({ name, email, age, createdAt });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Kullanıcı oluşturulamadı.' });
  }
};

exports.updateUser = async (req, res) => {
  const idSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
  });

  const { error: idError } = idSchema.validate(req.params);
  if (idError) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
  }


  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(18).optional(),
    createdAt: Joi.date().optional()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Kullanıcı güncellenemedi.' });
  }
};

exports.deleteUser = async (req, res) => {
  const idSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
  });

  const { error } = idSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json({ message: 'Kullanıcı silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Kullanıcı silinemedi.' });
  }
};
