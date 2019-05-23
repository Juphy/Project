import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { ManagerComponent } from './manager.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
const routes: Routes = [{ path: "", component: ManagerComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ManagerComponent, AddManagerComponent],
  entryComponents: [AddManagerComponent]
})
export class ManagerModule {}
