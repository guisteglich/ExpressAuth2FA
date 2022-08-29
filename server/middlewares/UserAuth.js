const Users = require('../models/User');

const authz = async (req, res, next) => {
    try {        
        if (!req.session.user) throw new Error('invalid');

        const user = await Users.findById(req.session.user.id);
        
        console.log(`authorized user with id ${user._id}`);
        
        return next();
    } catch (e) {
        if (e.message != 'invalid') {
            console.log(e)
        }
        res.status(401).json({ message: 'unauthorized' })
    }
}

module.exports = authz;