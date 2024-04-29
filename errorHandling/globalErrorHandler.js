// here is to handle errors

const globalErrorHandler = (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode).json({
        state: err.status,
        message: err.message,
        stack: err.stack,
    })
}

export default globalErrorHandler
