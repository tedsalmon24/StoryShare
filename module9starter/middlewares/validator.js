const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name is required').notEmpty().trim().escape(),
    body('lastName', 'Last name is req   uired').notEmpty().trim().escape(),
    body('email', 'Valid email is required').isEmail().trim().normalizeEmail(),
    body('password', 'Password is required, minimum 8 characters to 64.').isLength({min: 8, max: 64})];

exports.validateLoginIn = [body('email', 'Valid email is required').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password is required, minimum 8 characters to 64.').isLength({min: 8, max: 64})];


exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
        if(!errors.isEmpty()) {
            errors.array().forEach(error=>{
                req.flash('error', error.msg);
                return res.redirect('back');
            });
        return res.redirect('back');
    }  else {
    return next();  
}
}

exports.validateStory = [body('title', 'Title is required').notEmpty().trim().escape(),
    body('content', 'Content is required').isLength({min: 10}).notEmpty().trim().escape()];