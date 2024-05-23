const express =  require('express')

const {generateMail, sendEmails, sentEmails, recievedEmails} = require('../controller/email_controller')


const router = express.Router()

router.post('/send', sendEmails)
router.get('/generate', generateMail)
router.get('/sent', sentEmails)
router.get('/recieved',recievedEmails)


module.exports = router 