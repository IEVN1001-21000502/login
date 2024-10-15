import { Component } from '@angular/core';
import { IProductos } from '../productos';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent {
  imageWith:number = 50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string = ""
  mostrarImg():void{
    this.muestraImg=!this.muestraImg
  }
  productos:IProductos[]=[
    {
      "ProductoId":1,
      "Modelo":"Sentra",
      "Descripcion":"2 puertas",
      "Year":'2003',
      "Precio":120000,
      "Marca":"AUDI",
      "Color":"Rojo",
      "ImagenUrl":"https://th.bing.com/th/id/OIP.WvgFodcHj1LusN0BeGaX4wHaEo?rs=1&pid=ImgDetMain"
    },
    {
      "ProductoId":2,
      "Modelo":"Nissan",
      "Descripcion":"4 puertas",
      "Year":'2009',
      "Precio":170000,
      "Marca":"KIA",
      "Color":"Negro",
      "ImagenUrl":"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/08/23/16612738813175.jpg"
    },
    {
      "ProductoId":3,
      "Modelo":"chevrolet",
      "Descripcion":"2 puertas",
      "Year":'2003',
      "Precio":120000,
      "Marca":"HONDA",
      "Color":"Rojo",
      "ImagenUrl":"https://th.bing.com/th/id/OIP.I_mwW1qXjvCbHAWzSuUt_QHaEo?rs=1&pid=ImgDetMain"
    },
  ]
 
}
 