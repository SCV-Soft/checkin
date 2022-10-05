import { NotFoundError } from "@prisma/client/runtime";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { database } from "utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end("No AccessToken!");

        const decoded = jwt.verify(authorization, process.env.JWT_SECRET!) as JwtPayload;

        const user = await database.user.findUniqueOrThrow({
          where: { id: decoded.id },
          select: {
            id: true,
            codes: true,
          },
        });

        return res.status(200).json(user);
      } catch (e) {
        console.error(e);
        if (e instanceof JsonWebTokenError) return res.status(400).end("invalid accessToken");
        if (e instanceof NotFoundError) return res.status(403).end("Invalid email or password");
        if (e instanceof Error) return res.status(500).end(e.message);
        return res.status(500).end("Internal Server Error");
      }
    }
    default:
      return res.status(405).end();
  }
}
