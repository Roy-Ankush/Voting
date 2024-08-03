import jwt from  "jsonwebtoken"


// Generate Token
const generateToken = (userData) => {
    const options = {
      expiresIn: '1h', 
    };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(userData, secret, options);
  };
  



  // Verify Token Middleware
  const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"unauthorized"});
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };

  export { generateToken, verifyToken };