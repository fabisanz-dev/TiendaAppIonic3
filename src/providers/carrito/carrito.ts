
import { url_api } from './../url.providers';
import { Observable } from "rxjs";

import { UsuariosProvider } from './../usuarios/usuarios';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage, CarritoPage } from '../../pages/index.pages';

import { URLSearchParams  } from '@angular/http';

/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {

  public items: any[];
  public total_carrito: number = 0;
  public ordenes: any[];

  constructor(public http: HttpClient, private alertCtrl: AlertController,
   private _platform: Platform, private _storage: Storage,
   private _user: UsuariosProvider, public modalCtr: ModalController) {
    console.log('Hello CarritoProvider Provider');
    this.items = [];
    this.ordenes = [];
    
    //load storage
    this.cargar_storage();
    //total
    this.calcular_total_carrito();
  }

  agregarCarrito( item_param?:any ){
   /*  for (let item of this.items) {
      if( item.codigo === item_param.codigo){
        this.productoExistente = true;
       this.alertCtrl.create({
          title: 'Item existente',
          subTitle: `${ item_param.producto }, ya existe en su carrito`,
          buttons: ['OK']
        }).present();
        return;
      }
    }*/

    this.items.push( item_param );
    this.calcular_total_carrito();
    this.guardar_storage();
  }

  //calcular el total
  calcular_total_carrito( mas_cant:any=0 ){
    this.total_carrito = 0;
      console.log('calcular total', this.items)
    for(let item of this.items){

       //campo:subtotal se agrego desde que se agrega al carrito
        this.total_carrito += Number( item.subtotal );  
    }

    console.log('total carrito', this.total_carrito)

    this.guardar_storage();
  }

  eliminar_item(index:number){
    this.items.splice(index, 1);
    console.log('calcular total', this.items)
    this.guardar_storage();
    this.calcular_total_carrito();
    //this.total_carrito +=; //recalcular..
  }

  guardar_storage(){
    if( this._platform.is('cordova')){
      this._storage.set('items', this.items);
    }else{
      //storage desck
      sessionStorage.setItem('items', JSON.stringify(this.items) );
    }
  }


  cargar_storage(){

    let promise = new Promise((resolve, rejected)=>{

      if( this._platform.is('cordova')){     
        this._storage.ready().then(()=>{
          this._storage.get('items').then((value)=>{
            if(value){
              this.items = value;
            }
            resolve();
          });
        })

      }else{
        //storage desck
        if(sessionStorage.getItem('items')){
          this.items = JSON.parse(sessionStorage.getItem('items'));
        }   
        resolve();
      }

    });

    return promise;

  }

  //se vera el listado del carrito solo si el usuario esta logueado, para form login se usa modal
  ver_carrito(){
    let modal: any;

    if(this._user.token){
      modal = this.modalCtr.create( CarritoPage );
    }else{
      modal = this.modalCtr.create( LoginPage );
    }
    modal.present();

    modal.onDidDismiss(( abrirCarrito: boolean)=>{
      if( abrirCarrito ){
        modal = this.modalCtr.create( CarritoPage ).present();
      }

    })
  }

  

  /*metodo que obtendra los codigos de los pedidos (item.codigo) en array
  luego se transforma en string separados por coma y se envia una peticion post (items= ...) a la Api.
  Esta api recibe como parametro el token del usuario y su id*/
  realizar_pedido(){
    let data = new URLSearchParams;
    let codigos_producto: string[] = [];
    let cantidades_producto: string[] = [];
    let total_pedido: number = this.total_carrito;
    for(let item of this.items){
      codigos_producto.push( item.codigo ); // [cod1, cod2...]
      cantidades_producto.push( item.cantidad ); //[2, 5,...]
    }

    data.append("items", codigos_producto.join()); // items = cod1, cod2
    data.append("cantidades", cantidades_producto.join()); // cantidades = 2, 5
    data.append("totalOrden", total_pedido.toString());

    console.log('real pedido', total_pedido)

    let url = `${ url_api }/pedidos/realizar_orden/${ this._user.token }/${ this._user.id_usuario }`;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    
    this.http.post( url, data.toString(), {headers: headers})
             .subscribe(
               (data:any)=>{
               console.log('data', data)
               if(data){
                if(data.error){
                  this.alertCtrl.create({
                    title: 'Ha ocurrido un error',
                    subTitle:  data.mensaje,
                    buttons: ['OK']
                  }).present();
                }else{
                  this.items = [];//vaciar el pedido una vez realizado
                  this.calcular_total_carrito();
                  this.alertCtrl.create({
                    title: 'Pedido realizado',
                    subTitle: 'Nos contactaremos contigo para gestionar la orden',
                    buttons: ['OK']
                  }).present();
                }
               }
                  
             },
             error => {
               let err = <any>error;
               if(err){
                
                 console.log('error', err)
               }
             })
  }

  //todos los pedidos realizado por el usuario
  cargar_ordenes(){
    let url = `${ url_api }/pedidos/obtener_pedidos/${ this._user.token }/${ this._user.id_usuario}`;

    this.http.get(url).subscribe((data:any)=>{
      console.log('data', data)
       if(data.error){
        console.log('error')
       }else{
        this.ordenes = []; //reinicializar por eliminacion
         
        this.ordenes.push(... data.ordenes);
       }
    })
  }

  //borrar orden por su id
  borrar_orden(orden_id: any):Observable<any>{
    let url = `${ url_api }/pedidos/borrar_pedido/${ this._user.token }/${ this._user.id_usuario}/${ orden_id}`;

    return  this.http.delete(url);
  }

}
