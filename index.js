const express = require('express')
require('dotenv').config()
const emailRouter  = require('./routes/email_router')
const cors = require("cors");
const app = express()


const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors({ origin: true }));

app.use('/email', emailRouter)


app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    }
)
