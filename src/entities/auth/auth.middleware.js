import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length).trim();
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
    }
}
