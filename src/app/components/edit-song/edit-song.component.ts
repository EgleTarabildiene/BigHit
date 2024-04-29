import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.css'
})
export class EditSongComponent {
public id:string;
public author:string|null=null;
public songName:string|null=null;
public year:number|null=null;
public status:string|null=null;


constructor(private route:ActivatedRoute, private router:Router, private songsService:SongsService){

  this.id=this.route.snapshot.params['id']

  this.songsService.loadRecord(this.id).subscribe((data)=>{
    this.author=data.author;
    this.songName=data.songName;
    this.year=data.year;
    this.status=data.status;
    //console.log(data);
    
  })
}
public updateRecord(){
  if(
    this.author!=null && this.songName!=null && this.year!=null && this.status!=null){
      const record:Song={
        id:this.id,
        author:this.author,
        songName:this.songName,
        year:this.year,
        status:this.status
      }
      this.songsService.updateRecord(record).subscribe(()=>{
      this.router.navigate(['list']);
      
      });
    }
}


}

