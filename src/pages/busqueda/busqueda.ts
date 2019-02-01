
import { ProductoPage } from './../index.pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.providers';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  public searchList: any[];
  public productoPage;
  public loading: boolean;
  public emptySearch;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loadingCtrl: LoadingController, public _producto: ProductosProvider) {
    this.searchList = [];
    this.productoPage = ProductoPage;

    this.loading = false;
    this.emptySearch = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaPage');
  }

  //buscador
  onSearch(e){
    let val = e.target.value;
    console.log('valuesearch',val)
    
    this.loading = true;
    if(val !== ''){
      this._producto.buscar_producto(val);
        
     setTimeout(() => {
        this.loading = false;
        this.emptySearch = false;
        this.searchList = this._producto.resultado_busqueda;
        }, 400);
    }else{
      this.searchList = [];
      this.loading = false;
      this.emptySearch = true;
    }
      
  }

  //si cierra la busqueda
  onClear(e){
    let val = e.cancelable;
    if(e.cancelable){
      this.searchList = [];
      this.emptySearch = true;
      console.log('valuecancel', this.searchList)
    }
  }

  nexToPagePagina(item){
    this.navCtrl.push(
      this.productoPage,
      {
        producto:item
      })
  }
  

}
