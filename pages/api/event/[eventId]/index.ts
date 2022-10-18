import { NotFoundError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import { database } from "utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        const { eventId } = req.query;
        const event = await database.event.findUniqueOrThrow({
          where: {
            id: Number(eventId),
          },
          select: {
            id: true,
            name: true,
            description: true,
          },
        });
        return res.status(200).json(event);
      } catch (e) {
        console.error(e);
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
