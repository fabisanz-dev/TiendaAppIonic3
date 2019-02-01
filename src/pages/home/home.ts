import { MercadoProvider } from './../../providers/mercado/mercado';

import { ProductoPage } from './../producto/producto';
import { Component } from '@angular/core';
import { NavController, NavParams, NavPush } from 'ionic-angular';

import { ProductosProvider, UsuariosProvider, CarritoProvider } from '../../providers/index.providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public productoPage;
  public productoList:any[];

  public agregado: boolean;
  public hayMas: boolean;

  constructor(public navCtrl: NavController, public navParam: NavParams,
     public _productos: ProductosProvider,
     public _carrito: CarritoProvider, public _user: UsuariosProvider,
     public _mercadopago: MercadoProvider) {
    
    this.productoPage = ProductoPage;
    this.productoList = this._productos.productos;

    this.agregado = false;
    this.hayMas = true;

  }


  doInfinite(infiniteScroll){
    this._productos.cargarProductos()
    .then((value:boolean)=>{
      console.log(value)
        if(value){
          this.hayMas = false; 
        }else{
          this.hayMas = true;
        }
       
        infiniteScroll.complete();
        
        console.log('haymas', this.hayMas)
    })

  }

  toNextPage(event, item){
    this.navCtrl.push(
      this.productoPage,
      {
      producto:item
      }
    );

  }

  displayProducto(producto){
    for(let item of this._carrito.items){
      if(item.codigo === producto.codigo){
        return true;
      }
    }
      
    
  }

  /*productosAgregados(i){
    this._carrito.items.length > 0 && par[i].codigo === this._carrito.items[i].codigo}
  }*/

  /*cerrarSesion(){
    this._user.cerrar_sesion();

  }*/
 

}
