import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import { taskCreateSchema } from "./../../constants/schema/task.schema";
import withValidation from "../../utils/middleware/withValidation";

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
        let newTask = await prisma.task.create({
          data: {
            title: req.body.title,
            duration: req.body.duration,
            unit: req.body.unit,
            projectId: req.body.projectId,
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
