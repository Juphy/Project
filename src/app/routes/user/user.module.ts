import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [{ path: "", component: UserComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [UserComponent, AddUserComponent],
  entryComponents: [AddUserComponent]
})
export class UserModule {}
