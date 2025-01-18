import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const headerAuth = await req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!headerAuth) {
      return res.status(401).json({ message: "No Token Provided Access Denied, UnAuthentication.", success: false });
    }

    const verifyToken = jwt.verify(headerAuth, process.env.JWT_SECRET_KEY);

    if (verifyToken.email === process.env.ADMIN_EMAIL && verifyToken.password === process.env.ADMIN_PASSWORD) {
      next();
    } else {
      return res.status(403).json({ message: "Invalid Credentials.", success: false });
    }

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

};
export default adminAuth;