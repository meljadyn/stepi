import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from '@prisma/client';

import withValidation from "../../utils/middleware/withValidation";
import { userCreateSchema } from '../../constants/schema/user.schema';


type Data = {
  message: string;
  id?: string;
};

// Create a user
// Content-Type: application/json
// Body parameters: email, password
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    switch (req.method) {
      case "GET": {
        return res.redirect("/404");
      }

      case "POST": {
        try {
          let newUser = await prisma.user.create({
            data: {
              email: req.body.email.toLowerCase(),
              passhash: await bcrypt.hash(req.body.password, 10),
            },
          });

          return res.status(200).json({
            message: "User creation successful",
            id: newUser.id,
          });
        } catch (e) {
          // Database determines email is not unique
          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            return res.status(400).json({
              message: "Email is already in use",
            });
          }
        }

        return res.status(500).json({ message: "Internal error" });
      }

      default: {
        return res.status(405).json({ message: "Invalid access method used" });
      }
    }
}

export default withValidation(handler, userCreateSchema);
