const AppError = require('../utils/appError')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${error.path}: ${err.value}`
  return new AppError(message, 404)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value`

  return new AppError(message, 404)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 404)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401)

const handleJWTExpiredError = () =>
  new AppError('Expired token. Please log in again', 401)

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
  }
  // RENDERED WEBSITE
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  })
}

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err)
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err)
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    })
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err)
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  }
  // if (process.env.NODE_ENV === 'production')
  else {
    let error = { ...err }
    error.message = err.message
    console.log('in produciton')
    console.log(err)
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error)
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error)
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError()
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError()
    }

    sendErrorProd(error, req, res)
  }
}
