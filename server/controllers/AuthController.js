const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

require('dotenv').config();

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
        const { email, password } = req.body
        const token = jwt.sign({user: email}, process.env.SECRET ,{expiresIn: 24*3600}) //24h
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // console.log(req.body)

        Users.findOne({email: email})
            .then(user => {
                if (user) {
                    const isValid = bcrypt.compareSync(password, user.password)
                    if (isValid) {
                        // req.session.user = { id: user._id }
                        return res.cookie("access_token", token).json({ success: true, message: "Login efetuado com sucesso! "});
                        //return res.cookie("access_token", token).redirect('/')
                    }
                }
                res.status(400).send({ message: "Login inválido, verifique seus dados." })
            })
})

router.post('/authentication', (req, res) => {
    const data = req.headers.cookie

    values = data.split(';')
    token = values[1].split('=')

    // console.log(token[1])
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const isValid = jwt.verify(token[1],  process.env.SECRET)
    if (isValid) {
        return res.json({ success: true, message: "Autorizado meu fi."});
        // res.redirect('/')
    }
    res.status(401).send({ message: "Autorização inválida, proibido de entrar meu fi." })

})

module.exports = router