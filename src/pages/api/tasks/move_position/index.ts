import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]";

type Data = {
  message: string;
  id?: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET": {
      return res.redirect("/404");
    }

    case "PUT": {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(400).json({ message: "Invalid access" });
      }

      try {
        const moved = await prisma.task.findUnique({
          where: {
            id: req.body.moved,
          },
          select: {
            position: true,
            id: true,
            parentId: true,
            projectId: true,
          },
        });

        const reference = await prisma.task.findUnique({
          where: {
            id: req.body.reference,
          },
          select: {
            position: true,
            id: true,
            parentId: true,
            projectId: true,
          },
        });

        if (
          !(moved && reference) ||
          moved.parentId != reference.parentId ||
          moved.projectId != reference.projectId
        ) {
          throw Error;
        }

        if (moved.position > reference.position) {
          await prisma.task.updateMany({
            where: {
              AND: [
                {
                  position: {
                    lt: moved.position,
                  },
                },
                {
                  position: {
                    gte: reference.position,
                  },
                },
                {
                  parentId: moved.parentId,
                },
                {
                  projectId: moved.projectId,
                },
              ],
            },
            data: {
              position: {
                increment: 1,
              },
            },
          });
        } else if (moved.position < reference.position) {
          await prisma.task.updateMany({
            where: {
              AND: [
                {
                  position: {
                    gt: moved.position,
                  },
                },
                {
                  position: {
                    lte: reference.position,
                  },
                },
                {
                  parentId: moved.parentId,
                },
                {
                  projectId: moved.projectId,
                },
              ],
            },
            data: {
              position: {
                decrement: 1,
              },
            },
          });
        }

        await prisma.task.update({
          where: {
            id: moved.id,
          },
          data: {
            position: reference.position,
          },
        });

        return res.status(200).json({ message: "Tasks successfully updated" });
      } catch (e) {
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    }

    default: {
      return res.status(405).json({ message: "Invalid access method used" });
    }
  }
}

export default handler;
