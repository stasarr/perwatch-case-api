require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir hata oluştu' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor...`));
