import { AlertController, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams  } from '@angular/http';
import { Injectable } from '@angular/core';
import { url_api } from './../../providers/url.providers';
import { Storage } from '@ionic/storage';



/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  public id_usuario:string;
  public token:string;

  constructor(public http: HttpClient, public alertCtrl: AlertController,
    private _platform: Platform, private _storage: Storage,) {
    console.log('Hello UsuariosProvider Provider');

    this.cargar_storage();
  }

  //para controlar el boton cerrar session
  user_active():boolean{
    return this.token ? true : false;
  }


  loginUser(correo: any, contrasena:any) {

      let data: URLSearchParams = new URLSearchParams();

       data.append("correo", correo);
       data.append("contrasena", contrasena);
       
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

      let promise = new Promise((resolve, rejected)=>{

        this.http.post(url_api+'/login', data.toString(), {headers: headers})
        .subscribe((res:any) => {
          if(res){
            
            this.id_usuario = res.id_usuario;
            this.token = res.token;

            if(res.error){
              this.alertCtrl.create({
                title: "Error al procesar datos",
                subTitle:res.mensaje,
                buttons: ["Ok"]
              }).present();
             }

             resolve();
             
            //guardar en storage y preguntar por el token del usuario
            this.guardar_storage();
            
          }       
        }, (err) => {
          console.log('err',err)
          rejected(err);
        });

      });

      return promise;
      
   
  }

  guardar_storage(){
    if( this._platform.is('cordova')){
      this._storage.set('token', this.token);
      this._storage.set('id_usuario', this.id_usuario);
    }else{
      //storage desck
      if(this.token){
        sessionStorage.setItem('token', this.token );
        sessionStorage.setItem('id_usuario', this.id_usuario );
      }else{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id_usuario');
      }
     
    }
  }

  cargar_storage(){
    let promise = new Promise((resolve, rejected)=>{

      if( this._platform.is('cordova')){
      
        this._storage.ready().then(()=>{
          this._storage.get('token').then((value)=>{
            if(value){
              this.token = value;
            }
            resolve();
          });
          this._storage.get('id_usuario').then((value)=>{
            if(value){
              this.id_usuario = value;
            }
            resolve();
          });
        })

      }else{
        //storage desck
        if(sessionStorage.getItem('token')){
          this.token = sessionStorage.getItem('token');
        } 
        if(sessionStorage.getItem('id_usuario')){
          this.id_usuario = sessionStorage.getItem('id_usuario');
        }   
        resolve();
      }

    });

    return promise;
  }

  cerrar_sesion(){
    this.id_usuario = null;
    this.token = null;

    this.guardar_storage();
    this.user_active();
  }


  


}
