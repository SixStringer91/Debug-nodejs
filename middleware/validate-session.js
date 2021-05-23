const BEARER = 'Bearer'
const jwt = require('jsonwebtoken');
const { sequelize, Sequelize } = require('../db');
const User = require('../models/user')(sequelize, Sequelize);

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
        const tokenString = req.headers.authorization.split(' ');
        const sessionToken = tokenString[0] === BEARER
            ? tokenString[1]
            : null;
        console.log(sessionToken);
        if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." });
        else {
            jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.body.user = user.dataValues;
                        console.log(`user: ${user}`)
                        next()
                    },
                        function () {
                            res.status(401).send({ error: "not authorized" });
                        })

                } else {
                    res.status(400).send({ error: "not authorized" })
                }
            });
        }
    }
}