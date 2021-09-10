import { Owner } from './Owner';

export type Note = {
  title: string;
  description: string;
  owner: Owner['id'];
};
