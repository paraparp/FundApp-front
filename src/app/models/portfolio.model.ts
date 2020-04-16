
import { Lot } from './lot.model';


export class Portfolio {


  constructor() {

    this.name = '';
    this.description = '';
  }

  id: number;
  name: string;
  description: string;
  idUser: number;
  lots: Lot[] = [];
  cost: number;



}
