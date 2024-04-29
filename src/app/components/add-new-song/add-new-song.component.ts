import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-song',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-song.component.html',
  styleUrl: './add-new-song.component.css'
})
export class AddNewSongComponent {

  public author:string| null=null;
  public songName:string|null = null;
  public year:number=NaN;
  public status:string| string|null=null;

public constructor(private songsService:SongsService){

}

public addSong(){
  if(this.author != null && this.songName !=null && this.status != null){
    this.songsService.addSong({
      author:this.author,
      songName:this.songName,
      year:this.year,
      status:this.status,
      id:null,
    }).subscribe(()=>{
      this.author=null;
      this.songName=null;
      this.year=NaN;
      this.status=null;

    })
  }
}


}