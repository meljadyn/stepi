import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

import { sessionCreateSchema } from "../../constants/schema/session.schema";
import withValidation from "../../middleware/withValidation";

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
      return res.status(200).json({
        message: "User authenticated",
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

type User = {
  id: number;
};

export default withValidation(handler, sessionCreateSchema);
