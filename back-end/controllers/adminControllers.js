import jwt from "jsonwebtoken";
import "dotenv/config";

const adminLogin = async (req, res) => {
  try {

    const data = await req.body;

    if (data.email === process.env.ADMIN_EMAIL && data.password === process.env.ADMIN_PASSWORD) {

      const adminPayload = {
        email: data.email,
        password: data.password
      };
      const token = jwt.sign(adminPayload, process.env.JWT_SECRET_KEY);

      return res.status(201).json({ token: token, success: true });

    } else {
      return res.status(403).json({ message: "Invalid Credentials.", success: false });
    }

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export { adminLogin };