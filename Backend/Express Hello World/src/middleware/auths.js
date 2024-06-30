import jwt from 'jsonwebtoken';

const secretKey = 'h123h123';

const generateToken = (_id) => {
    try {
        return jwt.sign({ _id }, secretKey, { expiresIn: '1h' }); // Change user to whatever payload you want to include in the token
    } catch (error) {
        throw new Error('Token generation failed');
    }
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new Error('Unauthorized - No token provided');
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                throw new Error('Unauthorized - Invalid token');
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export { verifyToken, generateToken };

