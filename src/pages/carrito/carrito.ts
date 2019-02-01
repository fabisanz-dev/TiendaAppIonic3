
import { CarritoProvider } from './../../providers/index.providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Carrito } from './../_models/carrito.model';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  public items: Carrito[];
  public cantidad: number;

  public subtotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  private _carrito: CarritoProvider) {
    this.items = this._carrito.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
    console.log('testcarrito', this.items);

    
  }

  sumarCantidad(index){
        this.items[index].cantidad +=1;
        this.items[index].subtotal = (this.items[index].precio_compra*this.items[index].cantidad);
        this._carrito.calcular_total_carrito();
  }

  restarCantidad(index){
   
    this.items[index].cantidad -=1;
    this.items[index].subtotal = (this.items[index].precio_compra*this.items[index].cantidad);
    this._carrito.calcular_total_carrito();
    
  }



}
