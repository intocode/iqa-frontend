require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectAndStartServer = async () => {
  const { port, mongoServer } = process.env;

  try {
    await mongoose.connect(mongoServer);

    app.listen(port, () => {
      console.log(`Успешно соединились. Порт ${port}`);
    });
  } catch (e) {
    console.log(`Ошибка при подключении: ${e.toString()}`);
  }
};

connectAndStartServer();
