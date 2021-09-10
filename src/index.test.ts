import createApp from './index';
import express, { Express } from 'express';
import { mocked } from 'ts-jest/utils';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import createPostNote from './routes/postNote';
import mockClient from './client.mock';

jest.mock('morgan');
jest.mock('express');
jest.mock('body-parser', () => ({
  json: jest.fn()
}));
jest.mock('./routes/postNote');

const mockApp = jest.fn() as unknown as Express;
const mockUse = jest.fn();
const mockPost = jest.fn();
const mockJsonBodyParser = jest.fn();
const mockLoggingMiddleware = jest.fn();
const mockPostNote = jest.fn();

describe('application', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockApp.use = mockUse;
    mockApp.post = mockPost;
    mocked(express).mockReturnValue(mockApp);
    mocked(bodyParser.json).mockReturnValue(mockJsonBodyParser);
    mocked(morgan).mockReturnValue(mockLoggingMiddleware);
    mocked(createPostNote).mockReturnValue(mockPostNote);
  });
  it('creates an application', () => {
    const app = createApp(mockClient);

    expect(app).toBe(mockApp);
  });
  it('parses json request bodies', () => {
    createApp(mockClient);

    expect(mockUse).toHaveBeenCalledWith(mockJsonBodyParser);
  });
  it('logs requests', () => {
    createApp(mockClient);

    expect(morgan).toHaveBeenCalledWith('dev');
    expect(mockUse).toHaveBeenCalledWith(mockLoggingMiddleware);
  });
  (process.env.ENABLE_ADDING_NOTES === 'true' ? it : it.skip)(
    'mounts handler to create notes',
    () => {
      createApp(mockClient);

      expect(createPostNote).toHaveBeenCalledWith(mockClient);
      expect(mockPost).toHaveBeenCalledWith('/notes', mockPostNote);
    }
  );
});
