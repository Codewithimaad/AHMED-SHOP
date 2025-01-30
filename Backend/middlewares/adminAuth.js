import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.email !== process.env.ADMIN_EMAIL && tokenDecode.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Please Login Again' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;