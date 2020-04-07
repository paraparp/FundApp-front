import { Lot } from './lot.model';

export class PortfolioSymbols {


  symbol: Symbol;
  lastPrice: number;
  lastDate: Date;
  idPortfolio: string;
  lots: Lot[];
  volume: number;
  value: number;
  cost: number;
  price: number;
}
