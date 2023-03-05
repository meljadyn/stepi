import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import { projectCreateSchema } from "./../../constants/schema/project.schema";
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
        let newProject = await prisma.project.create({
          data: {
            userId: session.user.id,
            name: req.body.name,
          },
        });

        return res.status(200).json({
          message: "Project creation successful",
          id: newProject.id,
        });
      } catch (e) {
        console.error(e);
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

export default withValidation(handler, projectCreateSchema);
