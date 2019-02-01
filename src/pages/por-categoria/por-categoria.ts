import { ProductoPage } from './../index.pages';
import { ProductosProvider } from './../../providers/productos/productos';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the PorCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-por-categoria',
  templateUrl: 'por-categoria.html',
})
export class PorCategoriaPage {
  public categoria:any = {};
  public productoPage = ProductoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _lineas_por_cat: ProductosProvider) {
    this.categoria = this.navParams.get('categoria');

    this._lineas_por_cat.cargar_por_categoria( this.categoria.id );

    //console.log('test porcat', this._lineas_por_cat.por_categoria)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PorCategoriaPage');
  }

  toNextPage(item){
    this.navCtrl.push(
      this.productoPage,
      {
      producto: item
      });
  }

}
