import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import set from "date-fns/set";

import { authOptions } from "./auth/[...nextauth]";
import { taskCreateSchema } from "./../../constants/schema/task.schema";
import withValidation from "../../utils/middleware/withValidation";

type Data = {
  message: string;
  id?: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Invalid access method used" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).json({ message: "Invalid access" });
  }

  const [hours, minutes] = req.body.duration.split(":");
  try {
    let newTask = await prisma.task.create({
      data: {
        title: req.body.title,
        duration: set(new Date(), { hours: hours, minutes: minutes }),
        projectId: 1, // TODO: Send projectId with the request, as well as parent
      },
    });

    return res.status(200).json({
      message: "Task creation successful",
      id: newTask.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export default withValidation(handler, taskCreateSchema);