import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public correo: any;
  public contrasena: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
  public _usuarios:UsuariosProvider) {

    this.correo = '';
    this.contrasena = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logearse(){
    this._usuarios.loginUser(this.correo, this.contrasena)
    .then(()=>{
      if(this._usuarios.user_active()){
        this.viewCtrl.dismiss(true)
      }else{
        console.log('usuario no activo');  
      }
    });
  }

}
