import createRoute from './postNote';
import { Request, RequestHandler, Response } from 'express';
import mockClient from '../client.mock';
import { Note } from '@prisma/client';

let route: RequestHandler;
const mockNext = jest.fn();

const mockNote: Note = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet',
  ownerId: 42,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 13
};
const mockRequest = {
  body: mockNote
} as Request;
const mockResponse = {
  json: jest.fn()
} as unknown as Response;

describe('create notes route', () => {
  beforeEach(() => {
    route = createRoute(mockClient);
    jest.resetAllMocks();
  });
  it('creates a new note', () => {
    route(mockRequest, {} as Response, mockNext);

    expect(mockClient.note.create).toHaveBeenCalledWith({
      data: mockNote
    });
  });
  it('sends the created note back', async () => {
    mockClient.note.create.mockResolvedValue(mockNote);

    await route(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockNote);
  });
  it('calls next handler with error', async () => {
    const mockError = new Error('Something terrible has happened...');
    mockClient.note.create.mockRejectedValue(mockError);

    await route(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
