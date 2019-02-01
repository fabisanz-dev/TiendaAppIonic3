import { url_img } from './../../providers/url.providers';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ImagenUrlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'imagenUrl',
})
export class ImagenUrlPipe implements PipeTransform {

  transform(value: string) {
    return url_img + value + '.jpg';
  }
}
