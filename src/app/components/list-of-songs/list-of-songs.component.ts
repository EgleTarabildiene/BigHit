import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-of-songs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-of-songs.component.html',
  styleUrl: './list-of-songs.component.css'
})
export class ListOfSongsComponent {
  public songs: Song[]=[];




public constructor(private songsService:SongsService){
  //this.songs=songsService.songs;
this.loadData();


}

private loadData(){
  let x=this.songsService.loadData();

  this.songsService.loadData().subscribe((data)=>{
    this.songs=[];
for (let x in data){
  this.songs.push({...data[x], id:x}); 
}
console.log(this.songs);
});
}

public deleteRecord(id:string| null){
  if(id!=null){
  this.songsService.deleteRecord(id).subscribe(()=>{
  this.loadData();
  });
}
 }
}
