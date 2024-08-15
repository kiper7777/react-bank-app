// Підключаємо роутер до бек-енду
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Підключіть файли роутів
// const { User } = require('../class/user')
// const {Confirm} = require('../class/confirm')
// const {Session} = require('../class/session')
// const {SignupPageClass} = require('../class/SignupPageClass')

let confirmationCodes = {} // Store confirmation codes keyed by email

// let users = []; // Mock database for users

// Временное хранилище пользователей и кодов восстановления
let users = [
  {
    email: 'ivan@ukr.net',
    password: '$2b$10$.ZJ8W9/I4DxKgf/FV3U1ET3T5Ym0hvF.', // хеш для "123"
    confirmed: true,
  },
  {
    email: 'pulka@inbox.eu',
    password: '$2b$10$KIX6Q9YzFkG5XxZHmTWIw.ZJ8W9/I4DxKgf/FV3U1ET3T5Ym0hvF.', // хеш для "123"
    confirmed: true,
  },
];

let recoveryCodes = {}

// Функция для генерации случайного кода восстановления
const generateRecoveryCode = () => {
  return crypto.randomBytes(3).toString('hex') // Генерируем 6-значный код
}

//============================================
router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    component: ['BackButton', 'SignupPage'],

    title: 'Signup page',
    data: {},
  })
})

// Route for signup
router.post('/signup', (req, res) => {
  const { email, password } = req.body

  // Generate confirmation code
  const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString()

  // Save user to mock database (in memory for this example)
  const newUser = {
    email,
    password,
    confirmationCode,
    confirmed: false,
  }
  users.push(newUser)

  console.log('New user registered:', newUser)

  // Send confirmation code back to the client for confirmation step
  res.json({ success: true, confirmationCode })
})

//============================================

router.get('/signup-confirm', function (req, res) {
  return res.render('signup-confirm', {
    name: 'signup-confirm',
    component: [
      'BackButton',
      'SignupConfirmPage',
      // 'field',
      // 'field-password',
    ],

    title: 'Signup confirm page',
    data: {},
  })
})

// Route for confirmation
router.post('/signup-confirm', (req, res) => {
  const { code } = req.body

  // Find user by confirmation code
  const user = users.find(
    (user) => user.confirmationCode === code,
  )

  if (user) {
    // Mark user as confirmed
    user.confirmed = true
    res.json({ success: true })
  } else {
    res
      .status(400)
      .json({
        success: false,
        error: 'Invalid confirmation code',
      })
  }
})

//========================================================
router.get('/signin', function (req, res) {
  return res.render('signin', {
    name: 'signin',
    component: [
      'BackButton',
      'SigninPage',
      // 'field',
      // 'field-password',
    ],

    title: 'Signin page',
    data: {},
  })
})

// Route for signin
router.post('/signin', (req, res) => {
  const { email, password } = req.body

  // Find user by email and password
  const user = users.find(
    (user) =>
      user.email === email && user.password === password,
  )

  if (user) {
    if (user.confirmed) {
      res.json({ success: true })
    } else {
      res
        .status(400)
        .json({
          success: false,
          error: 'Email not confirmed',
        })
    }
  } else {
    res
      .status(401)
      .json({
        success: false,
        error: 'Invalid email or password',
      })
  }
})

//======================================================
router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: [
      'BackButton',
      'RecoveryPage',
      // 'field',
      // 'field-password',
    ],

    title: 'Recovery page',
    data: {},
  })
})

// Маршрут для отправки кода восстановления
router.post('/recovery', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Email is required',
      })
  }

  // Поиск пользователя по email
  const user = users.find((u) => u.email === email)

  if (!user) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'User with this email does not exist',
      })
  }

  // Генерация кода восстановления
  const recoveryCode = generateRecoveryCode()

  // Сохранение кода восстановления в памяти
  recoveryCodes[email] = recoveryCode

  // В реальном приложении здесь бы отправили код на email
  console.log(
    `Generated recovery code for ${email}: ${recoveryCode}`,
  )

  return res
    .status(200)
    .json({
      success: true,
      message: 'Recovery code sent',
      confirmationCode: recoveryCode,
    })
})

//===================================================
router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: [
      'BackButton',
      'RecoveryConfirmPage',
      // 'field',
      // 'field-password',
    ],

    title: 'Recovery confirm page',
    data: {},
  })
})

// Маршрут для подтверждения кода и изменения пароля
router.post('/recovery-confirm', (req, res) => {
  const { email, code, newPassword } = req.body

  if (!email || !code || !newPassword) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'All fields are required',
      })
  }

  // Проверка кода восстановления
  if (recoveryCodes[email] !== code) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid recovery code',
      })
  }

  // Обновление пароля пользователя
  const user = users.find((u) => u.email === email)
  user.password = newPassword

  // Удаление использованного кода восстановления
  delete recoveryCodes[email]

  return res
    .status(200)
    .json({
      success: true,
      message: 'Password updated successfully',
    })
})

//========================================================
router.get('/balance', function (req, res) {
  return res.render('balance', {
    name: 'balance',
    component: [
      'BalancePage',
      // 'field',
      // 'field-password',
    ],

    title: 'Balance page',
    data: {},
  })
})

router.post('/balance', function (req, res) {
  const { email, password } = req.body

  console.log(req.body)
})

// Route to get all users (for debugging purposes)
router.get('/users', (req, res) => {
  res.json(users)
})

// Маршрут для обновления email и пароля
router.post('/settings', async (req, res) => {
  const { action, newEmail, oldPassword, newPassword } = req.body;

  // В реальном приложении здесь должна быть проверка аутентификации пользователя
  const user = users[0];

  if (action === 'updateEmail') {
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: 'Invalid old password' });
    }
    user.email = newEmail;
    res.json({ success: true, message: 'Email updated successfully' });
  } else if (action === 'updatePassword') {
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: 'Invalid old password' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    res.json({ success: true, message: 'Password updated successfully' });
  } else {
    res.status(400).json({ success: false, error: 'Invalid action' });
  }
});

//======================================================
// Підключаємо роутер до бек-енду
module.exports = router
