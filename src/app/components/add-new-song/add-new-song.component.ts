import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-add-new-song',
  standalone: true,
  imports: [CommonModule,  FormsModule, LoadingComponent, ErrorComponent],
  templateUrl: './add-new-song.component.html',
  styleUrl: './add-new-song.component.css'
})
export class AddNewSongComponent {

  public author:string| null=null;
  public songName:string|null = null;
  public year:number=NaN;
  public status:string| string|null=null;
  public isLoading=false;
  public isError = false;

public constructor(private songsService:SongsService){

}

public addSong(){
  if(this.author != null && this.songName !=null && this.status != null){
    this.isLoading=true;
    this.songsService.addSong({
      author:this.author,
      songName:this.songName,
      year:this.year,
      status:this.status,
      id:null,
    }).subscribe({
      next:()=>{
        this.author=null;
        this.songName=null;
        this.year=NaN;
        this.status=null;
        this.isLoading=false;
      },
error:()=>{
  this.isError=true;
  this.isLoading=false;
}

    })
     
    
  }
}


}