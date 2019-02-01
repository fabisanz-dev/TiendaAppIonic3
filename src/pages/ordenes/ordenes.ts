import { OrdenesDetallePage } from './../index.pages';
import { CarritoProvider } from './../../providers/index.providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  public odenesDetallePage = OrdenesDetallePage;
  public ordenes:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _carrito: CarritoProvider) {
   
    
  }


  ionViewWillEnter(){
   // this.navCtrl.setRoot(this.navCtrl.getActive().component);

   this._carrito.cargar_ordenes();
   // this.ordenes = [];
    //this.ordenes = this._carrito.ordenes;
    //this.ordenes = this._carrito.ordenes;
    console.log('ionViewDidLoad OrdenesPage', this._carrito.ordenes);

  }

  toNextPageOdenesDetalle(item){
    //console.log('event', event)
    this.navCtrl.push(
      this.odenesDetallePage,
      { orden: item }
    );
  }



}
