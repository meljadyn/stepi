import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { taskCreateSchema } from "../../../constants/schema/task.schema";
import withValidation from "../../../utils/middleware/withValidation";

type Data = {
  message: string;
  id?: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET": {
      return res.redirect("/404");
    }

    case "POST": {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(400).json({ message: "Invalid access" });
      }

      try {
        // Get the position of the last task in this category, so the new
        // task is placed last in order
        let lastPosition = await prisma.task.findFirst({
          where: {
            parentId: req.body.parentId || null,
            projectId: req.body.projectId,
          },
          orderBy: {
            position: "desc",
          },
          select: {
            position: true,
          },
        });

        let newTask = await prisma.task.create({
          data: {
            title: req.body.title,
            duration: req.body.duration,
            unit: req.body.unit,
            projectId: req.body.projectId,
            parentId: req.body.parentId || null,
            position: (lastPosition?.position as number) + 1 || 0,
          },
        });

        return res.status(200).json({
          message: "Task creation successful",
          id: newTask.id,
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

export default withValidation(handler, taskCreateSchema);
