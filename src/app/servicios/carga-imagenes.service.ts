import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES='img';
  constructor(private db: AngularFirestore) { }

  //Este proceso esta documentado aca:
  //https://firebase.google.com/docs/storage/web/upload-files?authuser=0
  public cargarImagenesFireBase(imagenes){
    const storageRef=firebase.storage().ref();
    const that=this; //almaceno el contexto this
    for(const item of imagenes){
      item.estaSubiendo=true;
      //Administra cargas (seccion)
      const uploadTask = storageRef.child(this.CARPETA_IMAGENES+"/"+item.nombreArchivo)
      .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot:any){
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, function(error) {
        console.error("error al subir la imagen");
        // Handle unsuccessful uploads
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
         // console.log('File available at', downloadURL);
          item.url = downloadURL;
          item.estaSubiendo = false;
          that.guardarImagen({
            name: item.nombreArchivo,
            url: item.url
          });
        });
      });
    }

  }

  private guardarImagen(imagen:{name:string,url:string}){
    //console.log(imagen);
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
