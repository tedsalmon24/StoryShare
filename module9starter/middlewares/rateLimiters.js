const rateLimit = require ('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    handler: (req, res, next) => {
        let err = new Error('Too many login attempts, please try again later');
        err.status = 429;
        return next(err);   
    }   
  });
