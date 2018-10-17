import { Component, OnInit } from '@angular/core';
import {FileItem } from '../../clases/file-item_class';
import {CargaImagenesService} from '../../servicios/carga-imagenes.service';
@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivosC:FileItem[]=[];
  estaSobreElemento=false;
  constructor( private _cargaImagenes:CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes(){
   console.log(this.archivosC);
   this._cargaImagenes.cargarImagenesFireBase(this.archivosC);
  }

  limpiar(){
    this.archivosC=[];
  }

}
