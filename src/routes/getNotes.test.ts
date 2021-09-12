import createRoute from './getNotes';
import mockClient from '../client.mock';
import { Note } from '@prisma/client';
import { Request, Response } from 'express';

const mockRequest = {} as Request;
const mockResponse = {
  json: jest.fn()
} as unknown as Response;

const mockNotes: Note[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'foo bar',
    title: 'qux doo',
    ownerId: 1
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'lorem ipsum',
    title: 'asd qwe zxc',
    ownerId: 1
  }
];

describe('get notes route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('sends back all notes', async () => {
    mockClient.note.findMany.mockResolvedValue(mockNotes);
    await createRoute(mockClient)(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockNotes);
  });
});
