import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from '@prisma/client';

import withValidation from "../../utils/middleware/withValidation";
import { userCreateSchema } from '../../constants/schema/user.schema';


type Data = {
  message: string
  id?: number,
}


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid access method used"})
  }

  try {
    let newUser = await prisma.user.create({
      data: {
        email: req.body.email.toLowerCase(),
        passhash: await bcrypt.hash(req.body.password, 10)
      }
    })

    return res.status(200).json({
      message: "User creation successful",
      id: newUser.id,
    });

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return res.status(400).json({
        message: "Email is already in use"
      })
    }
  }

  return res.status(500).json({ message: "Internal error" })
}

export default withValidation(handler, userCreateSchema);
