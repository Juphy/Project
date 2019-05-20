import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
