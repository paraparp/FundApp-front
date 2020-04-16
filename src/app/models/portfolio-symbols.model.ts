import { Lot } from './lot.model';
import { Symb } from './symbol.model';

export class PortfolioSymbs {


  symbol: Symb;
  lastPrice: number;
  lastDate: Date;
  idPortfolio: string;
  lots: Lot[];
  volume: number;
  value: number;
  cost: number;
  price: number;
}
