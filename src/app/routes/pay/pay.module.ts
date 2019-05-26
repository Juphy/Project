import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { PayComponent } from "./pay.component";
const routes: Routes = [{ path: "", component: PayComponent }];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [PayComponent]
})
export class PayModule {}
