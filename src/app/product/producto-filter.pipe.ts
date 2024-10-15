import { Pipe, PipeTransform } from '@angular/core';
import { IProductos } from './productos';

@Pipe({
  name: 'productoFilter',
})
export class ProductoFilterPipe implements PipeTransform {
  transform(value: IProductos[], args: string): IProductos[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    return filter
      ? value.filter(
          (producto: IProductos) =>
            producto.Modelo.toLocaleLowerCase().indexOf(filter) != -1
        )
      : value;
  }
}
