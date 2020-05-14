import { Portfolio } from './portfolio.model';
import { Symb } from './symbol.model';
export class Lot {

  constructor() {
  }

  id: number;
  symbol: Symb;
  portfolio: Portfolio;
  volume: number;
  price: number;
  currency: string = 'EUR';
  broker: string;
  date: Date = new Date();
  cost: number = 0.0;

}
