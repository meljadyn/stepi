import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

import { sessionCreateSchema } from "../../constants/schema/session.schema";
import withValidation from "../../middleware/withValidation";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

import dotenv from "dotenv";
dotenv.config();

type Data = {
  message: string;
  user?: {
    id: number;
    email: string;
  };
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Invalid access method used" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email.toLowerCase(),
    },
    select: {
      id: true,
      email: true,
      passhash: true,
    },
  });

  if (user) {
    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.passhash
    );

    if (passwordIsCorrect) {
      const token = jwt.sign(
        { user: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "30d" }
      );

      setCookie("auth", token, {
        req,
        res,
        maxAge: 3200,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "User validated",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  }

  return res.status(400).json({
    message: "Email and password combination not found",
  });
}

export default withValidation(handler, sessionCreateSchema);
