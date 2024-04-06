// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
// const test = require('./test')
const { User } = require('../class/user')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

// router.get('/', (req, res) => {
//   res.status(200).json('Hello World')
// })

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);


// Експортуємо глобальний роутер
module.exports = router
