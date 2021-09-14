import { Request, Response } from 'express';
import createRoute, { DeleteNoteParams } from './deleteNote';
import mockClient from '../client.mock';

const noteToDeleteId = '13';
const mockRequest = {
  params: {
    noteId: noteToDeleteId
  }
} as Request<DeleteNoteParams>;
const mockResponse = {
  json: jest.fn()
} as unknown as Response;

describe('delete note route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('deletes a note', async () => {
    const pending = createRoute(mockClient)(mockRequest, mockResponse);

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockClient.note.delete).toHaveBeenCalledWith({
      where: {
        id: Number(noteToDeleteId)
      }
    });
    await pending.then(() => {
      expect(mockResponse.json).toHaveBeenCalledWith(200);
    });
  });
});
