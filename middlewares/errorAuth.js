const { validateToken } = require('../auth/tokenConfig');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ message: 'Token not found' });

        const user = validateToken(authorization);
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
        req.user = user;
        next();
    } catch (error) {
        console.log(`POST AUTHFALHA: ${error.message}`);
         return res.status(401).json({ message: 'jwt malformed' });
    }
};