const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

const path = require("path")

const port = process.env.PORT || 9000
const secret = process.env.SECRET || "garrett smith web developer"


app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the Rock The Vote DB")
)

app.use("/auth", require('./routes/authRouter'))
app.use("/api", expressJwt({ secret: secret, algorithms: ['HS256'] }))
app.use("/api/issue", require('./routes/issueRouter'))
app.use("/api/comment", require('./routes/commentRouter'))
app.use("/api/vote", require('./routes/voteRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 9000, () => {
    console.log("The server is running on Port 9000")
})