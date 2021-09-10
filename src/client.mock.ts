import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

const mockClient = mockDeep<PrismaClient>();

export default mockClient;
