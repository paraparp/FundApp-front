
import { Lot } from './lot.model';
import { User } from './user.model';

export class Portfolio {


  id: string;
  name: string;
  description: string;
  user: User;
  lots: Lot[] = []



}
