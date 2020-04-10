
import { Lot } from './lot.model';


export class Portfolio {


  id: string;
  name: string;
  description: string;
  idUser: number;
  lots: Lot[] = [];
  cost: number;



}
