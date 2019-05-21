import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { NewsComponent } from "./news.component";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
const routes: Routes = [{ path: "", component: NewsComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [NewsComponent, CreateComponent],
  entryComponents: [CreateComponent]
})
export class NewsModule {}
