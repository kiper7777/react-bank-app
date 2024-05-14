// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')
const {Confirm} = require('../class/confirm')
const {Session} = require('../class/session')
// const {SignupPageClass} = require('../class/SignupPageClass')

// Mock database
const users = [];

// Function to generate random confirmation code
const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

//============================================
router.get('/signup', function (req, res) {
    return res.render('signup', {
        name: 'signup',
        component: [
            'BackButton',
            'SignupPage',
        ],

        title: 'Signup page',
        data: {},
    })
})

router.post('/signup', function (req, res) {
    const {email, password} = req.body;

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Save user to database (in memory for this example)
    users.push({ email, password, confirmationCode });

    // Send response to the client
    res.json({ success: true, confirmationCode });

    console.log(email, confirmationCode)

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
})

//============================================

router.get('/signup-confirm', function (req, res) {
    const {renew, email} = req.query

    if (renew) {
        Confirm.create(email)
    }

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

router.post('/signup-confirm', function (req, res) {
    // const {code, token} = req.body

    const { code } = req.body;
    console.log(req.body);

    // Find user by confirmation code
//   const user = users.find((user) => user.email === email);
  const user = users.find((user) => user.confirmationCode === code);

  if (user) {
    // Remove confirmation code after successful confirmation
    delete user.confirmationCode;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid confirmation code' });
  }

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

router.post('/signin', function (req, res) {
    const {email, password} = req.body

    console.log(req.body)

    // Check if email and password are correct (dummy logic)
    if (email === 'email' && password === 'password') {
        // If credentials are correct, send success response
        res.json({ success: true });
    } else {
        // If credentials are incorrect, send error response
        res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    //===========================//

    if (!email || !password) {
        return res.status(400).json({
            message: "Помилка. Обов'язкові поля відсутні",
        })
    }

    try {
        const user = User.getByEmail(email)

        if (!user) {
            return res.status(400).json({
                message: "Помилка. Користувач з таким email не існує",
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "Помилка. Пароль не підходить",
            })
        }

        const session = Session.create(user)

        return res.status(200).json({
            message: "Ви увійшли",
            session,
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
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

router.post('/recovery', function (req, res) {
    const {email} = req.body

    console.log(email)

    if (!email) {
        return res.status(400).json({
            message: "Помилка. Обов'язкові поля відсутні",
        })
    }

    try {
        const user = User.getByEmail(email)

        if (!user) {
            return res.status(400).json({
                message: "Користувач з таким email не існує",
            })
        }

        Confirm.create(email)

        return res.status(200).json({
            message: "Код для відновлення паролю відправлено",
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        })
    }
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

router.post('/recovery-confirm', function (req, res) {
    const {code, newPassword} = req.body
    console.log(code, newPassword)
    
    // Check if code and newPassword are provided
    if (!code || !newPassword) {
        return res.status(400).json({
            error: 'Code and newPassword are required'
            // message: "Помилка. Обов'язкові поля відсутні",
        })
    }

    try {
        const email = Confirm.getData(Number(code))

        if (!email) {
            return res.status(400).json({
                message: "Код не існує",
            })
        }

        const user = User.getByEmail(email)

        if (!user) {
            return res.status(400).json({
                message: "Користувач з таким email не існує",
            })
        }

        

        // Check if the code matches
//   const user = users.find((user) => user.confirmationCode === code);

  if (user) {
    // Update user's password
    user.password = newPassword;
    
    // Remove confirmation code
    delete user.confirmationCode;

    // Handle successful password restoration
    res.json({ success: true });
  } else {
    // Handle invalid code
    res.json({ success: false, error: 'Invalid confirmation code' });
  }

        console.log(user)

        const session = Session.create(user)

        return res.status(200).json({
            message: "Пароль змінено",
            session,
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        })
    }
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
    const {email, password} = req.body

    console.log(req.body)
})

//======================================================
// Підключаємо роутер до бек-енду
module.exports = router
