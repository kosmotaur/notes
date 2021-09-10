describe('database client', () => {
  afterEach(() => {
    jest.resetModules();
  });
  it('creates a client', async () => {
    jest.doMock('@prisma/client');
    const { PrismaClient } = await import('@prisma/client');
    const client = (await import('./client')).default;

    expect(client).toBeInstanceOf(PrismaClient);
  });
});
