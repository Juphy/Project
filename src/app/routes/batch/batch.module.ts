import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { BatchComponent } from './batch.component';
const routes: Routes = [{ path: "", component: BatchComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [BatchComponent]
})
export class BatchModule {}
