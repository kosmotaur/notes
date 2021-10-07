import { Request, Response } from 'express';
import createRoute from './putNote';
import mockClient from '../client.mock';
import { Note } from '@prisma/client';
import { BaseNote } from '../Note';
import chance from '../utils/chance';
import { createNote } from '../features/step-definitions/common';

const noteToUpdateId = String(chance.natural());
const update = {
  description: chance.sentence(),
  title: chance.sentence()
};

const mockRequest = {
  params: {
    noteId: noteToUpdateId
  },
  body: update
} as Request<
  {
    noteId: string;
  },
  Note,
  Partial<BaseNote>
>;
const mockJson = jest.fn();
const mockStatus = jest.fn();
const mockResponse = {
  json: mockJson,
  status: mockStatus
} as unknown as Response;

describe('put note route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockStatus.mockImplementation(() => mockResponse);
  });
  it('updates a note', async () => {
    const updatedNote: Note = {
      ...createNote(),
      ...update
    };
    mockClient.note.update.mockResolvedValue(updatedNote);

    const pending = createRoute(mockClient)(mockRequest, mockResponse);

    expect(mockClient.note.update).toHaveBeenCalledWith({
      where: {
        id: Number(noteToUpdateId)
      },
      data: update
    });
    await pending.then(() => {
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedNote);
    });
  });
});
