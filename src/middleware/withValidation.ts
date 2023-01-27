import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const withValidation = (handler: NextApiHandler, schema: z.ZodType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && ["POST", "PUT"].includes(req.method)) {
      try {
        schema.parse(req.body);
      } catch (e) {
        return res.status(400).json(e);
      }
    }

    handler(req, res);
  }
}
export default withValidation;
