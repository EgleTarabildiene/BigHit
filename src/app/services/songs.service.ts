import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  

constructor(private http:HttpClient){}




public addSong(item:Song){
this.songs.push(item);
return this.http.post("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json", item);
}

public loadData(){
  return this.http.get<{[key:string]:Song}>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs.json");
}
public loadRecord(id:string){
return this.http.get<Song>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json");
}

public updateRecord(item:Song){
 return this.http.patch("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+item.id+".json",item);
}

public deleteRecord(id:string){
   return this.http.delete("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json");
}

}
