// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')
const {Confirm} = require('../class/confirm')
const {Session} = require('../class/session')
User.create({
    email: 'user@mail.com',
    password: 123,
})

User.create({
    email: 'admin@mail.com',
    password: 123,
})

//=================================
router.get('/signup', function (req, res) {
    return res.render('signup', {
        name: 'signup',
        component: [
            'BackButton',
        ],

        title: 'Signup page',
    })
})

router.post('/signup', function (req, res) {
    const {email, password} = req.body

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({
            message: "Помилка. Обов'язкові поля відсутні",
        })
    }

    try {
        const user = User.getByEmail(email)

        if (user) {
            return res.status(400).json({
                message: "Помилка. Такий користувач вже існує",
            })
        }

        const newUser = User.create({email, password})

        const session = Session.create(newUser)

        confirm.create(newUser.email)

        return res.status(200).json({
            message: "Користувач успішно зареєстрований",
            session,
        })
    } catch (err) {
        return res.status(400).json({
            message: "Помилка створення користувача",
        })
    }
})

//===================================================
router.get('/signin', function (req, res) {
    return res.render('signin', {
        name: 'signin',
        component: [
            'BackButton',
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
            // 'field',
            // 'field-password',
        ],

        title: 'Recovery confirm page',
        data: {},
    })
})

router.post('/recovery-confirm', function (req, res) {
    const {password, code} = req.body

    console.log(password, code)

    if (!code || !password) {
        return res.status(400).json({
            message: "Помилка. Обов'язкові поля відсутні",
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

        user.password = password

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

//============================+++++++++++++++++++++++++=====
// Підключаємо роутер до бек-енду
module.exports = router
