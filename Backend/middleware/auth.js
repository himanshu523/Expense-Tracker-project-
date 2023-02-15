const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'secretKey');
        console.log('userID >>>>', user);
        User.findByPk(user.userId).then(user => {

            req.user = user; 
            //console.log(req.user);
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}

module.exports = {
    authenticate
}