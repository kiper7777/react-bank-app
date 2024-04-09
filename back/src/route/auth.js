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
            'back-button',
            'field',
            'field-password',
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

//=================================