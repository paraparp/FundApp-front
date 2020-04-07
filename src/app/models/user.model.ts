import { Portfolio } from './portfolio.model';

export class User {



  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  creationDate: Date;
  password: string;
  enabled?: boolean;
  google?: boolean;
  roles: string[] = [];
  portfolios: Portfolio[] = [];
}
