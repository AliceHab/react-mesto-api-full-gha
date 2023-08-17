const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// eslint-disable-next-line no-unused-vars
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Пользователь не найден');
      } else if (err.kind === 'ObjectId') {
        throw new BadRequestError('Ошибка в данных');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const {
        // eslint-disable-next-line no-shadow
        _id, name, about, avatar, email,
      } = user;
      res.status(201).send({
        data: {
          _id,
          name,
          about,
          avatar,
          email,
        },
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-underscore-dangle
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка в данных');
      }
      if (err.code === 11000) {
        throw new ConflictError('Почта занята');
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );

      res.cookie('jwt', token, {
        maxAge: 604900,
        httpOnly: true,
        sameSite: true,
      });

      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка в данных');
      } else {
        throw new UnauthorizedError('Ошибка аутентификации');
      }
    })
    .catch(next);
};

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt', {
    maxAge: 604900,
    httpOnly: true,
    sameSite: true,
  });

  res.status(200).send({ message: 'Cookie cleared' }).catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Пользователь не найден');
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка в данных');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, avatar, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Пользователь не найден');
      } else if (err.kind === 'ObjectId') {
        throw new BadRequestError('Ошибка в данных');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const owner = req.user._id;

  User.findById(owner)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Пользователь не найден');
      } else if (err.kind === 'ObjectId') {
        throw new BadRequestError('Ошибка в данных');
      } else {
        next(err);
      }
    })
    .catch(next);
};
