const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const responseMsg = (res, con, msg, result = []) => {
    res.status(200).json({
        con,
        msg,
        result
    });
}
module.exports = {
    encodePass: password => bcrypt.hashSync(password),
    comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
    makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1hr"
    }),
    responseMsg
}