import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gamingPcValidationSchema } from 'validationSchema/gaming-pcs';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGamingPcs();
    case 'POST':
      return createGamingPc();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGamingPcs() {
    const data = await prisma.gaming_pc
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'gaming_pc'));
    return res.status(200).json(data);
  }

  async function createGamingPc() {
    await gamingPcValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.booking?.length > 0) {
      const create_booking = body.booking;
      body.booking = {
        create: create_booking,
      };
    } else {
      delete body.booking;
    }
    const data = await prisma.gaming_pc.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
