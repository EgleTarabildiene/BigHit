import { Routes } from '@angular/router';
import { ListOfSongsComponent } from './components/list-of-songs/list-of-songs.component';
import { AddNewSongComponent } from './components/add-new-song/add-new-song.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';

export const routes: Routes = [
    {path:"list", component:ListOfSongsComponent},
    {path:"addnew", component:AddNewSongComponent},
    {path:"edit/:id", component:EditSongComponent},
];
