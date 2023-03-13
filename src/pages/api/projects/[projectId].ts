import { FrontFacingProject } from "./../../../constants/types/database.types";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { projectCreateSchema } from "../../../constants/schema/project.schema";
import withValidation from "../../../utils/middleware/withValidation";
import { Prisma } from "@prisma/client";

// type Task = {
//   id: number;
//   children: any;
//   title: string;
//   duration: number | null;
//   unit: string | null;
// }[];

// type Data = {
//   message: string;
//   data?: {
//     id: number;
//     name: string;
//     tasks: Task[];
//   };
// };

type Data = {
  message: string;
  project?: any;
};

// Get project information; Will only fetch projects the signed in user
// owns
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET": {
      const session = await getServerSession(req, res, authOptions);
      const { projectId } = req.query;

      if (!(session && projectId)) {
        return res.status(400).json({ message: "Invalid access" });
      }
      const projectDetails = await prisma.project.findFirst({
        where: {
          id: parseInt(projectId[0]),
          userId: session.uid,
        },
        select: {
          id: true,
          name: true,
          tasks: {
            select: {
              id: true,
              title: true,
              duration: true,
              unit: true,
              children: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      });

      if (projectDetails) {
        return res
          .status(200)
          .json({ project: projectDetails, message: "Fetching successful" });
      }
    }

    default: {
      return res.status(405).json({ message: "Invalid access method used" });
    }
  }
}

export default withValidation(handler, projectCreateSchema);
