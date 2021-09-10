import createApp from './index';
import express, { Express } from 'express';
import { mocked } from 'ts-jest/utils';

jest.mock('express');

describe('application', () => {
  it('creates an application', () => {
    const mockApp = jest.fn() as unknown as Express;
    mocked(express).mockReturnValue(mockApp);

    const app = createApp();

    expect(app).toBe(mockApp);
  });
});
