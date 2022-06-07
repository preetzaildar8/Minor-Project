const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/book-routes')
const routerUser = require("./routes/user-routes")
const cors = require('cors')
const dotenv = require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/books', router)
app.use('/user', routerUser)

mongoose.connect("mongodb+srv://khushan:dbkhushan@cluster0.vkkgl.mongodb.net/booksFa?retryWrites=true&w=majority").then(() => console.log("Connected To Database")).then(() => {
    app.listen(5000)
}).catch((err) => console.log(err))

// app.use(cors());
// app.use(express.json())

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'khushan1',
//     database: "bfasample"
// });

// app.post('/create', (req, res) => {
//     const firstName = req.body.firstname
//     const lastName = req.body.lastname
//     const email = req.body.email
//     const password = req.body.password
//     const year = req.body.year
//     const branch = req.body.branch
//     const course = req.body.course

//     db.query('INSERT INTO users (firstname, lastname, email, password, year, branch, course) VALUES (?,?,?,?,?,?,?)', [firstName, lastName, email, password, year, branch, course],
//     (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send("Values Inserted")
//         }
//     })
// })

// app.listen(3001, () => {
//     console.log("It's working")
// })