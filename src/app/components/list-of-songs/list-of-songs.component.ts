import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-of-songs.component.html',
  styleUrl: './list-of-songs.component.css'
})
export class ListOfSongsComponent {
  public songs: Song[]=[];
public constructor(private songsService:SongsService){
  //this.songs=songsService.songs;
  this.songsService.loadData().subscribe((data)=>{
for (let x in data){
  this.songs.push(data[x]);
  
  
}
  });
}
}
