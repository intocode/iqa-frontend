require('dotenv').config();
require('./config/passport');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

const { PORT, MONGO_SERVER } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(require('./routes/auth.route'));

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_SERVER);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Успешно соединились. Порт ${PORT}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Ошибка при подключении: ${e.toString()}`);
  }
};

connectAndStartServer();
