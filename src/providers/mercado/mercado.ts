import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import  { mercadopago }  from 'mercadopago';

//const x = mercadopago();
/*
  Generated class for the MercadoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MercadoProvider {

  public mp;

  constructor(public http: HttpClient) {
    console.log('Hello MercadoProvider Provider');



   /* mercadopago.configure({
      sandbox: true,
      access_token: 'TEST-6040008942234017-012600-4c948c2a9764038bd4ce0601ed24c6fb__LD_LB__-39454083',

    });

    this.mp = console.log('mp payment', mercadopago.payment)*/

  }



}
