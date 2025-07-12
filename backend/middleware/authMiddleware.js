import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.user = decoded;  // user info from the token
        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(403).json({ msg: 'Invalid or expired token' });
    }
};
