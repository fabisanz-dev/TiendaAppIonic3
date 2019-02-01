
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage, OrdenesPage, CategoriaPage, BusquedaPage} from '../index.pages'
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public tab1 = HomePage;
  public tab2 = CategoriaPage;
  public tab3 = BusquedaPage;
  public tab4 = OrdenesPage;
  
  public enabledTab: boolean;

  public constructor(){
  }

}
