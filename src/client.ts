import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export type Client = PrismaClient;
export default client;
