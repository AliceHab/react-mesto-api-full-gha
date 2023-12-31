const express = require('express');

require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const NotFoundError = require('./errors/not-found-err');

const { createUser, login, signOut } = require('./controllers/users');
const linkRegExp = require('./utils/regexp');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(cors({ origin: ['http://localhost:3000', 'https://alicehab.nomoreparties.co'], credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(bodyParser.json());

app.use(limiter);

app.use(cookieParser());

mongoose.connect(DB_URL, {});

// логгер запросов
app.use(requestLogger);

app.get('/crash-test', () => { // удалить после ревью
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(linkRegExp),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.get('/signout', signOut);

// Пользователь
app.use(helmet());
app.use(auth);
app.use(require('./routes/users'));

// Карточки
app.use(helmet());
app.use(auth);
app.use(require('./routes/cards'));

// eslint-disable-next-line no-unused-vars
app.use('*', (req, res) => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
