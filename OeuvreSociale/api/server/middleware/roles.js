const UserModel= require('../models/user');


const verifyRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            console.log(user);
            // Check if user is not authenticated or if user's role does not match required role
            if (!user || !role.includes(user.role)) {
                return res.sendStatus(401);
            }

          next();
        } catch (error) {
            // Handle any errors
            console.error('Error in verifyRole middleware:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

//async function (){}

module.exports = {verifyRole} ; 

