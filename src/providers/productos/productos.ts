import { url_api } from './../url.providers';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';*/

/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {

  public pagina: number = 0;
  public productos: any[] = [];
  public lineas: any[] = [];
  public por_categoria: any[] = [];
  public resultado_busqueda: any[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello ProductosProvider Provider');

    this.cargarProductos();
    this.cargar_lineas();

    
  }

  cargarProductos(){
    let promise = new Promise((resolve, reject)=>{

      let url = `${url_api}/productos/todos/${ this.pagina }`;

      this.http.get(url)
      .subscribe(
        (data:any)=>{
          console.log('test',data)
          //console.log(data.productos)

          if( data.error){
            console.log('Ha ocurrido un error en la peticion');
          }else{
            let newData = this.agruparArray(data.productos, 2);
            this.productos.push( ...newData);
            this.pagina += 1;

            console.log(this.pagina)

            if(data.productos.length == 0){
              console.log('finalizo array');
              resolve(true);
              return;
            }


          }

          resolve();

        
        /*  if(data.productos.length == 0){
            console.log('finalizo array');
          }*/
          
        },
        (err)=>{
          console.log('Error: %s', err);
        }
       
      );

       
    });

    return promise;
    
  }

  cargar_lineas(){
    let url = `${url_api}/lineas`;

    this.http.get(url)
    //.pipe( map( resp => resp.json() ) )
    .subscribe(
      (data:any) =>{
        console.log('test',data)

        if( data.error){
          console.log('Ha ocurrido un error en la peticion');
        }else{
          this.lineas.push( ...data.lineas);
         // this.pagina = +1;
        }

      });
  }

  cargar_por_categoria( categoria:number ){
    let url = `${url_api}/productos/por_tipo/${ categoria }`;

    this.http.get(url)
    //.pipe( map( resp => resp.json() ) )
    .subscribe(
      (data:any) =>{
        console.log('test',data)

        if( data.error){
          console.log('Ha ocurrido un error en la peticion');
        }else{
          
          this.por_categoria.push( ...data.productos);
         // this.pagina = +1;
        }

      });
  }


  private agruparArray(array:any, tam:number){
    let newArray = [];
    for (let i = 0; i < array.length; i +=tam) {
      newArray.push( array.slice(i, i+tam) ); //[ [item1, item2], [item3, item4]...]
    }
    return newArray;
  }


  buscar_producto(termino:string){
    let url = `${ url_api }/productos/buscar/${ termino }`;

    this.http.get(url)
             .subscribe((data:any)=>{
               if(data.error){
                 console.log('Ha ocurrido un error al intentar mostrar los datos');
               }else{
                this.resultado_busqueda = data.productos;
               }
             });
  }



}
