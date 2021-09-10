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

describe('create notes route', () => {
  beforeEach(() => {
    route = createRoute(mockClient);
  });
  it('creates a new note', () => {
    const mockRequest = {
      body: mockNote
    } as Request;

    route(mockRequest, {} as Response, mockNext);
    expect(mockClient.note.create).toHaveBeenCalledWith({
      data: mockNote
    });
  });
  it('calls next handler', () => {
    route({} as Request, {} as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });
});
