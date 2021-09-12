import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const main = () =>
  client.user.create({
    data: {
      id: 1
    }
  });

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => client.$disconnect());
