import { PorCategoriaPage } from './../por-categoria/por-categoria';
import { ProductosProvider } from './../../providers/productos/productos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  public _porCategoriaPage = PorCategoriaPage

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _lineas: ProductosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

  toNextPage(event, item){
    this.navCtrl.push(
      this._porCategoriaPage,
      {
      categoria:item
      }
    );
  }



}
