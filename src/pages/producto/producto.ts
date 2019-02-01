import { HomePage } from './../home/home';
import { UsuariosProvider } from './../../providers/index.providers';
import { CarritoProvider } from './../../providers/carrito/carrito';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  public producto: any;
  public productoExistente: boolean;
  public homePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _carrito: CarritoProvider, public _user: UsuariosProvider) {
      
    //se le pasa el objeto producto por navbar
    this.producto = this.navParams.get('producto');
    this.verificarExistenciaCarrito(); //verificar productos agregados
    this.productoExistente = false;

    //cantidad y subtotal  cuando agrega al carrito
    this.producto.cantidad = 1;
    this.producto.subtotal = (this.producto.precio_compra*this.producto.cantidad);

    this.homePage = HomePage;
  }

  verificarExistenciaCarrito(){
    for(let item of this._carrito.items){
      if( item.codigo === this.producto.codigo ){
        this.productoExistente = true;
      }
    }
  }

  agregarCarrito(producto?:any){
    this._carrito.agregarCarrito(producto);
      for(let item of this._carrito.items){
        if( item.codigo === producto.codigo ){
          this.productoExistente = true;
        }
      }

    //this.navCtrl.popToRoot();
  }

}
