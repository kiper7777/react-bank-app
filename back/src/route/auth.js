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
// Пример пользователей (в реальном приложении используйте базу данных)
let users = [
  {
    email: 'ivan@ukr.net',
    password: '$2b$10$KIX6Q9YzFkG5XxZHmTWIw.ZJ8W9/I4DxKgf/FV3U1ET3T5Ym0hvF.', // хеш для "123"
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

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: 'Email and password are required' })
//   }

//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' })
//   }

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

//=========================================================//
// if (!email || !password) {
//     return res.status(400).json({
//         message: "Помилка. Обов'язкові поля відсутні",
//     })
// }

// try {
//     const user = User.getByEmail(email)

//     if (user) {
//         return res.status(400).json({
//             message: "Помилка. Такий користувач вже існує",
//         })
//     }

//     const newUser = User.create({email, password})

//     const session = Session.create(newUser)

//     confirm.create(newUser.email)

//     return res.status(200).json({
//         message: "Користувач успішно зареєстрований",
//         session,
//     })
// } catch (err) {
//     return res.status(400).json({
//         message: "Помилка створення користувача",
//     })
// }

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

// if (!email || !code) {
//     return res.status(400).json({ success: false, error: 'Email and confirmation code are required' });
// }

// const storedCode = confirmationCodes[email];

// if (storedCode !== code) {
//     console.log('Invalid confirmation code:', code);
//     return res.status(400).json({ success: false, error: 'Invalid confirmation code' });
// }

// console.log(`Account confirmed for ${email}`);
// users[email].confirmed = true; // Mark user as confirmed
// delete confirmationCodes[email]; // Remove code after successful confirmation
// res.status(200).json({ success: true });

//     // const {code, token} = req.body

//     const { code } = req.body;
//     console.log(req.body);

//     // Find user by confirmation code
// //   const user = users.find((user) => user.email === email);
//   const user = users.find((user) => user.confirmationCode === code);

//   if (user) {
//     // Remove confirmation code after successful confirmation
//     delete user.confirmationCode;
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false, error: 'Invalid confirmation code' });
//   }

//=========================================//

// if (!code || !token) {
//     return res.status(400).json({
//         message: "Помилка. Обов'язкові поля відсутні",
//     })
// }

// try {
//     const session = Session.get(token)

//     if (!session) {
//         return res.status(400).json({
//             message: "Помилка. Ви не увійшли в акаунт",
//         })
//     }

//     const email = Confirm.getData(code)

//     if (!email) {
//         return res.status(400).json({
//             message: "Код не існує",
//         })
//     }

//     if (email !== session.user.email) {
//         return res.status(400).json({
//             message: "Код не дійсний",
//         })
//     }

//     const user = User.getByEmail(session.user.email)
//     user.isConfirm = true
//     session.user.isConfirm = true

//     return res.status(200).json({
//         message: "Ви підтвердили свою пошту",
//         session,
//     })
// } catch (err) {
//     return res.status(400).json({
//         message: err.message,
//     })
// }

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

// Generate a token in a real application
//   res.json({ success: true, message: 'Signed in successfully' });

// if (!email || !password) {
//     return res.status(400).json({ success: false, error: 'Email and password are required' });
// }

// const user = users[email];

// if (!user) {
//     return res.status(400).json({ success: false, error: 'Invalid email or password' });
// }

// if (!user.confirmed) {
//     return res.status(400).json({ success: false, error: 'Account not confirmed' });
// }

// const isPasswordValid = await bcrypt.compare(password, user.password);

// if (!isPasswordValid) {
//     return res.status(400).json({ success: false, error: 'Invalid email or password' });
// }

// res.status(200).json({ success: true, token: 'dummy-token' });

//===========================//

// if (!email || !password) {
//     return res.status(400).json({
//         message: "Помилка. Обов'язкові поля відсутні",
//     })
// }

// try {
//     const user = User.getByEmail(email)

//     if (!user) {
//         return res.status(400).json({
//             message: "Помилка. Користувач з таким email не існує",
//         })
//     }

//     if (user.password !== password) {
//         return res.status(400).json({
//             message: "Помилка. Пароль не підходить",
//         })
//     }

//     const session = Session.create(user)

//     return res.status(200).json({
//         message: "Ви увійшли",
//         session,
//     })
// } catch (err) {
//     return res.status(400).json({
//         message: err.message,
//     })
// }

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

// router.post('/recovery', (req, res) => {
//     const { email } = req.body;
//     // Ваша логика для отправки кода восстановления пароля по электронной почте
//     const recoveryCode = generateRecoveryCode(); // Функция для генерации кода восстановления
//     // Сохранение кода в базе данных или временном хранилище
//     res.status(200).json({ success: true, confirmationCode: recoveryCode });
//   });

// router.post('/recovery', function (req, res) {
//     const {email} = req.body

//     console.log(email)

//     if (!email) {
//         return res.status(400).json({
//             message: "Помилка. Обов'язкові поля відсутні",
//         })
//     }

//     try {
//         const user = User.getByEmail(email)

//         if (!user) {
//             return res.status(400).json({
//                 message: "Користувач з таким email не існує",
//             })
//         }

//         Confirm.create(email)

//         return res.status(200).json({
//             message: "Код для відновлення паролю відправлено",
//         })
//     } catch (err) {
//         return res.status(400).json({
//             message: err.message,
//         })
//     }
// })

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

// app.post('/recovery-confirm', (req, res) => {
//     const { code, newPassword } = req.body;
//     // Ваша логика для проверки кода восстановления и обновления пароля
//     if (isValidRecoveryCode(code)) {
//       // Обновление пароля в базе данных или временном хранилище
//       res.status(200).json({ success: true, message: 'Password updated successfully' });
//     } else {
//       res.status(400).json({ success: false, error: 'Invalid recovery code' });
//     }
//   });

// router.post('/recovery-confirm', function (req, res) {
//     const {code, newPassword} = req.body
//     console.log(code, newPassword)

//     // Check if code and newPassword are provided
//     if (!code || !newPassword) {
//         return res.status(400).json({
//             error: 'Code and newPassword are required'
//             // message: "Помилка. Обов'язкові поля відсутні",
//         })
//     }

//     try {
//         const email = Confirm.getData(Number(code))

//         if (!email) {
//             return res.status(400).json({
//                 message: "Код не існує",
//             })
//         }

//         const user = User.getByEmail(email)

//         if (!user) {
//             return res.status(400).json({
//                 message: "Користувач з таким email не існує",
//             })
//         }

//         // Check if the code matches
// //   const user = users.find((user) => user.confirmationCode === code);

//   if (user) {
//     // Update user's password
//     user.password = newPassword;

//     // Remove confirmation code
//     delete user.confirmationCode;

//     // Handle successful password restoration
//     res.json({ success: true });
//   } else {
//     // Handle invalid code
//     res.json({ success: false, error: 'Invalid confirmation code' });
//   }

//         console.log(user)

//         const session = Session.create(user)

//         return res.status(200).json({
//             message: "Пароль змінено",
//             session,
//         })
//     } catch (err) {
//         return res.status(400).json({
//             message: err.message,
//         })
//     }
// })

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
