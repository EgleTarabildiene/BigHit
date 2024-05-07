import { EventEmitter, Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  public onSongsCountChange= new EventEmitter();
  public onStatusChange=new EventEmitter<Number>();

constructor(private http:HttpClient, private authService: AuthService){}



public addSong(item:Song){
this.songs.push(item);
return this.http.post("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json?auth"+this.authService.auth?.idToken,item).pipe(
    tap(()=>this.onSongsCountChange.emit())
);
}


public loadData(){
  //Gauname observable
 return this.http
 .get<{[key:string]:Song}>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json?auth="+this.authService.auth?.idToken)
.pipe(
  map( (data):Song[]=>{
    let songs=[];
  for (let x in data){
    songs.push({...data[x],id:x});
  }
   this.songs = songs;
this.onStatusChange.emit(0);
  return songs;
  }))
  .pipe(
    catchError((er, c)=>{
      this.onStatusChange.emit(1);
    throw "klaida";
    })
  )
  /*
  .pipe(
  tap((data)=>{

  console.log("Duomenis is tap");


  })
)
*/
//.pipe(
 // delay(1000)
//)
;
}
//Funkcija grazina observable


public loadRecord(id:string){
return this.http.get<Song>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json?auth="+this.authService.auth?.idToken);
}

public updateRecord(item:Song){
 return this.http.patch("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+item.id+".json?auth="+this.authService.auth?.idToken,item);
}

public deleteRecord(id:string){
   return this.http.delete("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json?auth="+this.authService.auth?.idToken).pipe(
    tap(()=>this.onSongsCountChange.emit())
);
}

}
