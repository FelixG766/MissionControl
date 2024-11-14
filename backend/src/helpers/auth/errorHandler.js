// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Check if response headers have already been sent to the client 
    if(res.headerSent){
        // If true, pass the error to the next error-handling middleware
        return next(err);
    }

    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

    res.status(statusCode);

    // Log errors in dev environment for debugging purposes.
    if(process.env.NODE_ENV === "dev"){
        console.log(err);
    }

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "prod" ? null: err.stack,
    });
}

export default errorHandler;