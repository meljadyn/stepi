import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { Console } from "console";

type Data = {
  message: string;
  id?: number;
};

// Deletes the task with the id passed into the url
// Requires an active session for the user that owns the task
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET": {
      return res.redirect("/404");
    }

    case "DELETE": {
      const session = await getServerSession(req, res, authOptions);
      const { taskId } = req.query;

      // Ensure that the task belongs to the user making the request
      const selectTask = await prisma.task.findUnique({
        where: {
          id: parseInt(taskId as string),
        },
        select: {
          project: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!session || selectTask!.project.userId !== session.user.id) {
        return res.status(400).json({ message: "Invalid access" });
      }

      try {
        // Delete task
        await prisma.task.delete({
          where: {
            id: parseInt(taskId as string),
          },
        });

        return res.status(200).json({
          message: "Deletion successful",
        });
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
