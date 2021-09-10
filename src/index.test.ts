import createApp from './index';
import express, { Express } from 'express';
import { mocked } from 'ts-jest/utils';
import bodyParser from 'body-parser';
import morgan from 'morgan';

jest.mock('morgan');
jest.mock('express');
jest.mock('body-parser', () => ({
  json: jest.fn()
}));

const mockApp = jest.fn() as unknown as Express;
const mockUse = jest.fn();
const mockJsonBodyParser = jest.fn();
const mockLoggingMiddleware = jest.fn();

describe('application', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockApp.use = mockUse;
    mocked(express).mockReturnValue(mockApp);
    mocked(bodyParser.json).mockReturnValue(mockJsonBodyParser);
    mocked(morgan).mockReturnValue(mockLoggingMiddleware);
  });
  it('creates an application', () => {
    const app = createApp();

    expect(app).toBe(mockApp);
  });
  it('parses json request bodies', () => {
    createApp();

    expect(mockUse).toHaveBeenCalledWith(mockJsonBodyParser);
  });
  it('logs requests', () => {
    createApp();

    expect(morgan).toHaveBeenCalledWith('dev');
    expect(mockUse).toHaveBeenCalledWith(mockLoggingMiddleware);
  });
});
