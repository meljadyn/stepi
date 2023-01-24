import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from '@prisma/client';

const saltRounds = 10;

type Data = {
  status: number
  message: string
  id?: number
}

// TODO: Add additional errors and handling, so it returns appropriately for
// TODO: blank responses as well as too long or short responses

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    let newUser;

    try {
      newUser = await prisma.user.create({
        data: {
          email: req.body.email,
          passhash: await bcrypt.hash(req.body.password, saltRounds)
        }
      })

      res.status(200).json({ status: 200, message: "User creation successful", id: newUser.id })
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error
      }

      if (error.code === "P2002") {
        res.status(400).json({ status: 400, message: "Email is already in use"})
      }
    }
  }

  res.status(405).json({ status: 405, message: "Invalid access method used"})
}
