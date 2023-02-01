import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from '@prisma/client';

import withValidation from '../../middleware/withValidation';
import { userCreateSchema } from '../../lib/schema/user.schema';


type Data = {
  status: number
  message: string
  data?: {
    id: number,
    email: string
  }
}


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
  if (req.method !== "POST") {
    res.status(405).json({ status: 405, message: "Invalid access method used"})
  }

  try {
    let newUser = await prisma.user.create({
      data: {
        email: req.body.email.toLowerCase(),
        passhash: await bcrypt.hash(req.body.password, 10)
      }
    })

    return res.status(200).json({
      status: 200,
      message: "User creation successful",
      data: {
        id: newUser.id,
        email: newUser.email
    }});

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return res.status(400).json({
        status: 400,
        message: "Email is already in use"
      })
    }
  }

  return res.status(500).json({ status: 500, message: "Internal error" })
}

export default withValidation(handler, userCreateSchema);
