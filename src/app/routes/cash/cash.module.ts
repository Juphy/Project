import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { CashComponent } from "./cash.component";
const routes: Routes = [{ path: "", component: CashComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [CashComponent]
})
export class CashModule {}
