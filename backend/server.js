require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter= require("./routes/authRoutes")
const connectDb = require('./connection')
const postRouter = require('./routes/postRoutes')
const app = express()
const port = process.env.PORT ||  3000

connectDb()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true 
}))
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


app.get('/', (req, res) => {
  res.json({
    "message":"Api working."
  })
})



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})