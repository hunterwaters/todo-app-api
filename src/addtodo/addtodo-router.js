const express = require('express')
const addtodoRouter = express.Router()
const bodyParser = express.json()

addtodoRouter
    .route('/api/addtodo')
    .post( bodyParser, (req, res) => {
        const { title, summary, date} = req.body
        if(!title) {
            return res
                .status(400)
                .send('Title Required');
        }
        if(!summary) {
            return res
                .status(400)
                .send('Summary Required');
        }
        if(!date) {
            return res
                .status(400)
                .send('Date is Required')
        }
        else {
            res.status(201).json({
                message: "Todo was created!"
            })
        }
    })

    module.exports = addtodoRouter
