import { EventEmitter, Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  public onSongsCountChange= new EventEmitter();

constructor(private http:HttpClient){}



public addSong(item:Song){
this.songs.push(item);
return this.http.post("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json", item).pipe(
    tap(()=>this.onSongsCountChange.emit())
);
}


public loadData(){
  //Gauname observable
 return this.http
 .get<{[key:string]:Song}>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json")
.pipe(
  map( (data):Song[]=>{
    let songs=[];
  for (let x in data){
    songs.push({...data[x],id:x});
  }
   this.songs =songs;
  return songs;
  }))
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
return this.http.get<Song>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json");
}

public updateRecord(item:Song){
 return this.http.patch("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+item.id+".json",item);
}

public deleteRecord(id:string){
   return this.http.delete("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json").pipe(
    tap(()=>this.onSongsCountChange.emit())
);
}

}
