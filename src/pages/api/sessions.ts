import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";

import bcrypt from "bcryptjs";

import withValidation from '../../middleware/withValidation';
import { sessionCreateSchema } from '../../lib/schema/session.schema';



type Data = {
  message: string
  id?: number
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid access method used"})
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email.toLowerCase(),
    },
    select: {
      id: true,
      passhash: true
    }
  })

  if (user) {
    const passwordIsCorrect =
      await bcrypt.compare(req.body.password, user.passhash);

    if (passwordIsCorrect) {
      console.log(user);
      return res.status(200).json({
        message: "User validated",
        id: user.id
      });
    }
  }

  return res.status(400).json({
    message: "Email and password combination not found"
  })
}

export default withValidation(handler, sessionCreateSchema);
