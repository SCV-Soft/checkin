import { NotFoundError } from "@prisma/client/runtime";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { database } from "utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      try {
        const { qrcode } = req.body;
        if (!qrcode) return res.status(400).end("no qrcode");

        const decoded = jwt.verify(qrcode, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) return res.status(400).end("invalid qrcode");

        const { user } = await database.qRCode.findFirstOrThrow({
          where: {
            event_id: decoded.event_id,
            user_id: decoded.user_id,
            code: decoded.code,
          },
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });

        return res.status(200).json(user);
      } catch (e) {
        console.error(e);
        if (e instanceof JsonWebTokenError) return res.status(400).end("invalid jwt token");
        if (e instanceof NotFoundError) return res.status(403).end("Invalid qrcode");
        if (e instanceof Error) return res.status(500).end(e.message);
        return res.status(500).end("Internal Server Error");
      }
    }
    default: {
      return res.status(405).end();
    }
  }
}
