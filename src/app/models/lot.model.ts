import { Portfolio } from './portfolio.model';
import { Symbol } from './symbol.model';
export class Lot {


  id: string;
  symbol: Symbol;
  portfolio: Portfolio;
  volume: number;
  price: number;
  currency: string = 'EUR';
  broker: string;
  date: Date;
  totalValue: number;



  getImporte() {
    return this.price * this.volume;
  }


}
