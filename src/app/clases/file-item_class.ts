export class FileItem{

    public archivo:File;
    public nombreArchivo:string;
    public url:string;
    public progreso:number;
    public estaSubiendo:boolean;

    constructor(archivo:File){
        this.archivo=archivo;
        this.nombreArchivo=archivo.name;
        this.estaSubiendo=false;
        this.progreso=0;
    }

    
}
