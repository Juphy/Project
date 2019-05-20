import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { NewsComponent } from "./news.component";
import { Routes, RouterModule } from "@angular/router";
import { UEditorModule } from "ngx-ueditor";
const routes: Routes = [{ path: "", component: NewsComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    UEditorModule.forRoot({
      js: ["/assets/js/ueditor.config.js", "/assets/js/ueditor.config.js"],
      options: {
        UEDITOR_HOME_URL: "/assets/ueditor/"
      }
    })
  ],
  declarations: [NewsComponent]
})
export class NewsModule {}
