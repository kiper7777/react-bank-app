// Підключаємо роутер до бек-енду
const express = require('express')
// створюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')

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
        }))
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

router.post('/user-item-data', function (req, res) {
    const {id} = req.query

    // console.log(id)

    if (!id) {
        return res.status(400).json({
            message: "Потрібно передати ID користувача",
        })
    }

    
})

//=================================
// Підключаємо роутер до бек-енду
module.exports = router
