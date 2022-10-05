import { randomUUID } from "crypto";

import { NotFoundError } from "@prisma/client/runtime";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { eventManager } from "react-toastify/dist/core";

import { database } from "utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end("No AccessToken!");

        const decoded = jwt.verify(authorization, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) return res.status(400).end();

        const user = await database.user.findFirstOrThrow({
          where: { id: decoded.id },
          select: {
            id: true,
          },
        });
        if (!user) return res.status(404).end("can't find user!");

        const event = await database.event.findFirstOrThrow({
          where: {
            id: Number(req.query.eventId),
          },
          select: {
            id: true,
          },
        });
        if (!event) return res.status(404).end("can't find event!");

        const qrcode = await database.qRCode.findFirst({
          where: {
            user_id: user.id,
            event_id: event.id,
          },
        });
        if (!qrcode) return res.status(404).end("qrcode not found!");

        return res.status(200).json({
          qrcode: jwt.sign(qrcode, process.env.JWT_SECRET!),
        });
      } catch (e) {
        console.error(e);
        if (e instanceof JsonWebTokenError) return res.status(400).end("invalid jwt token");
        if (e instanceof NotFoundError) return res.status(403).end("Can't find user / event");
        if (e instanceof Error) return res.status(500).end(e.message);
        return res.status(500).end("Internal Server Error");
      }
    }
    case "POST": {
      try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end("No AccessToken!");

        const decoded = jwt.verify(authorization, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) return res.status(400).end();

        const user = await database.user.findFirstOrThrow({
          where: { id: decoded.id },
          select: {
            id: true,
          },
        });
        if (!user) return res.status(404).end("can't find user!");

        const event = await database.event.findFirstOrThrow({
          where: {
            id: Number(req.query.eventId),
          },
          select: {
            id: true,
          },
        });
        if (!event) return res.status(404).end("can't find event!");

        const _qrcode = await database.qRCode.findFirst({
          where: {
            user_id: user.id,
            event_id: event.id,
          },
        });
        if (_qrcode) return res.status(409).end("qrcode already exists!");

        const qrcode = await database.qRCode.create({
          data: {
            user_id: user.id,
            event_id: event.id,
            code: randomUUID(),
          },
        });

        return res.status(200).json({
          qrcode: jwt.sign(qrcode, process.env.JWT_SECRET!),
        });
      } catch (e) {
        console.error(e);
        if (e instanceof JsonWebTokenError) return res.status(400).end("invalid jwt token");
        if (e instanceof NotFoundError) return res.status(403).end("Can't find user / event");
        if (e instanceof Error) return res.status(500).end(e.message);
        return res.status(500).end("Internal Server Error");
      }
    }
    default: {
      return res.status(405).end();
    }
  }
}
