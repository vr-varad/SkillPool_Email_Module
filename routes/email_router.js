const express =  require('express')

const {send, generateMail} = require('../controller/email_controller')


const router = express.Router()

router.get('/send', send)
router.get('/generate', generateMail)


module.exports = router