import createRoute from './postNote';
import { Note } from '../Note';
import { Request, RequestHandler, Response } from 'express';
import mockClient from '../client.mock';

let route: RequestHandler;
const mockNext = jest.fn();

describe('create notes route', () => {
  beforeEach(() => {
    route = createRoute(mockClient);
  });
  it('creates a new note', () => {
    const mockNote: Note = {
      title: 'my great note',
      description: 'Lorem ipsum dolor sit amet',
      owner: 42
    };
    const mockRequest = {
      body: mockNote
    } as Request;

    route(mockRequest, {} as Response, mockNext);
    expect(mockClient.note.create).toHaveBeenCalledWith({
      data: mockNote
    });
  });
});
