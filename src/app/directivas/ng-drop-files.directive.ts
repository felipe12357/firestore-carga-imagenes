import { Directive,EventEmitter,ElementRef,HostListener,Input,Output } from '@angular/core';
import { FileItem } from '../clases/file-item_class';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }
  @Output() mouseSobre:EventEmitter<boolean>=new EventEmitter();
  @Input() archivos:FileItem[]=[];

  @HostListener('dragover',['$event'])
  public onDragEnter(event:any){
    this.prevenirDetener(event);
    //console.log("maouse encima");
    this.mouseSobre.emit(true);
  }

  @HostListener('dragleave',['$event'])
  public onDragLeave(event:any){
    //console.log("mouse se fue");
    this.mouseSobre.emit(false);
  }

  @HostListener('drop',['$event'])
  public onDrop(event:any){
    //console.log("mouse se soltó el elmento");
    this.mouseSobre.emit(false);
    this.prevenirDetener(event);

    const transferencia=this.getTransferencia(event);
    if(!transferencia)
      return false;
    
      this.extraerArchivos(transferencia.files);
  }

  private getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer: event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList){
   // console.log(archivosLista);
    // tslint:disable-next-line:forin
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal=archivosLista[propiedad];

      if(!this.archivoYaCargado(archivoTemporal.name) && this.validarTipoArchivo(archivoTemporal.type)){
        const nuevoArchivo=new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
      
    }
  }

  //Validaciones
  private prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoYaCargado(nobmreArchivo:string):boolean{
    for(const archivo of this.archivos){
      if(archivo.nombreArchivo===nobmreArchivo)
        return true;
    }
    return false;
  }

  private validarTipoArchivo(tipoArchivo:string):boolean{
    
    if(tipoArchivo.startsWith('image'))
      return true;
    else
      return false;
  }
}
