import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

import { HttpClientModule } from '@angular/common/http';

import { ImagenUrlPipe } from './../pipes/imagen-url/imagen-url';

import { TabsPage, BusquedaPage, PorCategoriaPage, OrdenesDetallePage, OrdenesPage, LoginPage, CategoriaPage, ProductoPage, CarritoPage } from '../pages/index.pages';

import { IonicStorageModule } from '@ionic/storage';
import { MercadoProvider } from '../providers/mercado/mercado'; //para almacenamiento storage

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BusquedaPage,
    PorCategoriaPage,
    OrdenesDetallePage,
    OrdenesPage,
    LoginPage,
    CategoriaPage,
    ProductoPage,
    CarritoPage,
    ImagenUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
			platforms: {
				ios: {
          backButtonText: '',
          backButtonIcon: 'ios-arrow-dropleft',
				}
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BusquedaPage,
    PorCategoriaPage,
    OrdenesDetallePage,
    OrdenesPage,
    LoginPage,
    CategoriaPage,
    ProductoPage,
    CarritoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuariosProvider,
    MercadoProvider
  ]
})
export class AppModule {}
