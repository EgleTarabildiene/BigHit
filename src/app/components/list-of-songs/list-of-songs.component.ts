import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-list-of-songs',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './list-of-songs.component.html',
  styleUrl: './list-of-songs.component.css'
})
export class ListOfSongsComponent {
  public songs: Song[]=[];

public isLoading=false;
public isError=false;


public constructor(private songsService:SongsService){
  //this.songs=songsService.songs;
this.loadData();


}

private loadData(){
  let x=this.songsService.loadData();

let obs=this.songsService.loadData();


//Kaiturime tik viena funkcija kuria norime iskviesti po duomenu gavimo
/*obs.subscribe((data)=>{
  console.log("duomenis gauti paprastai");  
});
obs.subscribe({
  next:(data)=>{
  console.log("duomenis gauti is next");
  },
  error:(err)=>{
    console.log("Ivyko klaida");
  },
  complete:()=>{
    console.log("Observable baige darba");
  }
});
*/

this.isLoading=true;
this.isError=false;
obs.subscribe({
  next:(data)=>{
this.songs=data;
this.isLoading=false;
this.isError=false;
},
error:(error)=>{
  this.isError=true;
  this.isError=false;
}
});
}

public deleteRecord(id:string| null){
  if(id!=null){
    this.isLoading=true;
  this.songsService.deleteRecord(id).subscribe(()=>{
  this.loadData();
  this.isLoading=false;
  });
}
 }
}
