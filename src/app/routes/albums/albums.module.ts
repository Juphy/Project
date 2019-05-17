import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums.component';

const routes: Routes = [
  { path: '', component: AlbumsComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlbumsComponent]
})
export class AlbumsModule { }
