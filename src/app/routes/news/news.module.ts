import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { NewsComponent } from "./news.component";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { UEditorModule } from "ngx-ueditor";

const routes: Routes = [{ path: "", component: NewsComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    // UEditorModule.forRoot({
    //   js: [
    //     `/assets/ueditor/ueditor.config.js`,
    //     `/assets/ueditor/ueditor.all.min.js`
    //   ],
    //   options: {
    //     UEDITOR_HOME_URL: "/assets/ueditor/"
    //   }
    // })
  ],
  declarations: [NewsComponent, CreateComponent],
  entryComponents: [CreateComponent]
})
export class NewsModule {}
