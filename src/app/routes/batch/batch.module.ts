import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { BatchComponent } from './batch.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
const routes: Routes = [{ path: "", component: BatchComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [BatchComponent, AddBatchComponent],
  entryComponents: [AddBatchComponent]
})
export class BatchModule { }
