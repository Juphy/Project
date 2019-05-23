import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { RoleComponent } from "./role.component";
import { AddRoleComponent } from "./add-role/add-role.component";
const routes: Routes = [{ path: "", component: RoleComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [RoleComponent],
  entryComponents: [AddRoleComponent]
})
export class RoleModule {}
