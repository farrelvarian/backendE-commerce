require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productRouter = require('./src/routes/products')
const userRouter = require('./src/routes/users')
const categoryRouter = require('./src/routes/categories')
const orderRouter = require('./src/routes/orders')
const paymentRouter = require('./src/routes/payments')
const userAuthRouter = require("./src/routes/userAuth");
const morgan = require('morgan')
const PORT = process.env.PORT || 3500
const cors = require('cors')
const createError = require('http-errors')
const setCors = require("./src/middlewares/cors")
// middleware

app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cors());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // If needed
  res.header("Access-Control-Allow-Credentials", true); // If needed
  next();
});


app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/orders', orderRouter)
app.use('/payments', paymentRouter)
app.use("/", userAuthRouter);
app.use("/files", express.static("./uploads"));

app.use('*', (req, res, next) => {
    const error = new createError.NotFound()
    next(error)
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({
        message: err.message || 'internal server Error'
    })
})

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// app.listen(process.env.DB_PORT, () => {
//   console.log(`server is running on port ${process.env.DB_PORT}`);
// });