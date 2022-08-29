const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');

const Users = require('../models/User')

router.post('/register', (req, res) => {
        const {name, email, cpf, gender, phoneNumber, 
            birthDate, password, street, district, 
            city, state, zipCode, country} = req.body

        // console.log(name)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        const newUser = new Users({
            name,
            email,
            cpf,
            gender,
            phoneNumber,
            birthDate,
            password: hashPassword,
            address: {
                street,
                district,
                city,
                state,
                zipCode,
                country
            }
        })

        // console.log(newUser)

        newUser.save()
        .then(() => res.status(200).send({ success: true, message: "Cadastro efetuado com sucesso!" }))
        .catch((err) => {
            console.log("Registration error "+err)
        })
})

router.post('/login', (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)
        const { email, password } = req.body

        Users.findOne({email: email})
            .then(user => {
                if (user) {
                    const isValid = bcrypt.compareSync(password, user.password)
                    if (isValid) {
                        // req.session.user = { id: user._id }
                        return res.json({ success: true, message: "Login efetuado com sucesso!" });
                        // res.redirect('/')
                    }
                }
                res.status(400).send({ message: "Login inválido, verifique seus dados." })
            })
})

module.exports = router