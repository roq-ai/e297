import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { gamingPcValidationSchema } from 'validationSchema/gaming-pcs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.gaming_pc
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGamingPcById();
    case 'PUT':
      return updateGamingPcById();
    case 'DELETE':
      return deleteGamingPcById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGamingPcById() {
    const data = await prisma.gaming_pc.findFirst(convertQueryToPrismaUtil(req.query, 'gaming_pc'));
    return res.status(200).json(data);
  }

  async function updateGamingPcById() {
    await gamingPcValidationSchema.validate(req.body);
    const data = await prisma.gaming_pc.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGamingPcById() {
    const data = await prisma.gaming_pc.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
