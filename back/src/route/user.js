// Підключаємо роутер до бек-енду
const express = require('express')
// створюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')
// const {Confirm} = require('../class/confirm')
// const {Session} = require('../class/session')

//=================================

router.get('/user-list', function (req, res) {
    return res.render('user-list', {
        name: 'user-list',
        component: ['BackButton'],
        title: 'User list page',
        data: {},
    })
})

router.get('/user-list-data', function (req, res) {
    const list = User.getList()

    console.log(list)

    if (list.length === 0) {
        return res.status(400).json({
            message: "Список користувачів порожній",
        })
    }

    return res.status(200).json({
        list: list.map(({id, email}) => ({
            id,
            email,
        })),
    })
})

//=================================
router.get('/user-item', function (req, res) {
    return res.render('user-item', {
        name: 'user-item',
        component: [
            'BackButton',
            // 'field',
            // 'field-password',
        ],

        title: 'User item page',
        data: {},
    })
})

router.get('/user-item-data', function (req, res) {
    const {id} = req.query
    // console.log(id)

    if (!id) {
        return res.status(400).json({
            message: "Потрібно передати ID користувача",
        })
    }

    const user = User.getById(Number(id))

    if (!user) {
        return res.status(400).json({
            message: 'Користувач з таким ID не існує',
        })
    }

    return res.status(200).json({
        user: {
            id: user.id,
            email: user.email,
            isConfirm: user.isConfirm,
        },
    })
})

//=================================
// Підключаємо роутер до бек-енду
module.exports = router
