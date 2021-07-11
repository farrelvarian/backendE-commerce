require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productRouter = require('./src/routes/products')
const userRouter = require('./src/routes/users')
const categoryRouter = require('./src/routes/categories')
const orderRouter = require('./src/routes/orders')
const paymentRouter = require('./src/routes/payments')
const morgan = require('morgan')
const port = process.env.DB_PORT || 3500
const cors = require('cors')

// middleware

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cors())

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/orders', orderRouter)
app.use('/payments', paymentRouter)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
