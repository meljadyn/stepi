import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const withAuthentication = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.cookies.auth && process.env.JWT_SECRET) {
      jwt.verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
          return handler(req, res);
        }
      })
    }
    return res.status(401).json({ message: 'Authentication failed'});
  }
}
export default withAuthentication;
