const { sendError } = require("../utils/apiResponse");
const errorHandler = (err, req, res, next) => {
    console.error('Error: ' + err.message);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return sendError(res, message, statusCode);
};
module.exports = errorHandler;