import { CarritoProvider } from './../../providers/index.providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrdenesDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  public orden: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _carrito: CarritoProvider) {
   this.orden = this.navParams.get('orden');

    console.log('detalle', this.orden)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }

  borrar_orden(item){
    //this.orden.splice()
    this._carrito.borrar_orden(item).subscribe(
      (data)=>{
        if(data.error){
          console.log('Ha ocurrido un error al intentar eliminar el pedido')
        }else{
          this.navCtrl.pop();
        }
      })
  }

}
